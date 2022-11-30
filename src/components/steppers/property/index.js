import {
  memo, useCallback, useContext, useEffect, useReducer,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, Grid, Divider} from "@material-ui/core";
import {useSnackbar} from "notistack";
import get from "lodash/get";
import styles from "./styles";
import CustomButton from "../../inputs/CustomButton";
import {FarmsContext} from "../../../providers/Farms";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";
import Text from "../../inputs/Text";
import {postData} from "../../../common/api/request";
import LinearProgress from "../../Loaders/LinearLoader";
import {
  reducer,
  initialState,
  actionLoader,
  actionSetProperty,
  actionSetStep,
  actionCard,
  actionValidateStep,
} from "./reducer";
import {ERRORS, MANAGERS_LIMIT} from "../../../common/vars";
import useAsyncFetch from "../../../common/hooks/useAsyncFetch";

const useStyles = makeStyles(styles);

function StepperCard(props) {
  const {onClose, children} = props;
  const [{
    step,
    card,
    loader,
    propertyType,
    shift,
    validStep,
  }, dispatch] = useReducer(reducer, initialState(), initialState);
  const {enqueueSnackbar} = useSnackbar();
  const {props: colorTheme} = useTheme();
  const {farms, getFarms} = useContext(FarmsContext);
  const classes = useStyles();
  const [_, managers] = useAsyncFetch("/managers", {limit: MANAGERS_LIMIT});

  const managersList = get(managers, "payload", []);

  useEffect(() => {
    let result = true;
    if (step === 0) {
      if (propertyType === 0) {
        result = true;
      } else {
        result = !!(propertyType === 1 && card.farmId);
      }
    }
    if (step === 1) {
      if (propertyType === 0 && card.title) {
        result = !!(card?.managerId);
      } else {
        result = !!(propertyType === 1 && card.title);
      }
    }
    dispatch(actionValidateStep(result));
  }, [card, step, propertyType]);

  const setParam = useCallback((name, field) => {
    let result = {[name]: field};
    if (name === "tanks") {
      result = {[name]: Boolean(field)};
    }
    dispatch(actionCard(result));
  }, []);

  const onSubmit = useCallback(async () => {
    dispatch(actionLoader(true));
    const body = {heads: 0, ...card};
    try {
      const res = await postData("/farms", {body});
      if (res?.payload) {
        const message = `Успешно создан ${res.payload.title}`;
        enqueueSnackbar(message, {variant: "success"});
        setTimeout(() => {
          dispatch(actionLoader(false));
          getFarms();
          onClose();
        }, 400);
      } else {
        const message = res || ERRORS.UNKNOWN;
        enqueueSnackbar(message, {variant: "error"});
        dispatch(actionLoader(false));
      }
    } catch (err) {
      const message = err.message || err || ERRORS.UNKNOWN;
      enqueueSnackbar(message, {variant: "error"});
      dispatch(actionLoader(false));
    }
  }, [card]);

  const setProperty = useCallback((_, val) => {
    dispatch(actionSetProperty(val));
  }, []);

  return (
    <div className={classes.rootStep}>
      <Grid
        container
        className={classes.stepperWrap}>
        {children(step)}
      </Grid>
      <Box my={2}>
        {loader ? <LinearProgress /> : <Divider />}
      </Box>
      <Box
        mb={4}
        position="relative"
        overflow="hidden">
        <div
          className={classes.animateFormContainer}
          style={{
            width: `${100 * 3}%`,
            left: `${shift}%`,
          }}>
          <FirstStep
            card={card}
            active={step === 0}
            setProperty={setProperty}
            propertyType={propertyType}
            setParam={setParam}
            farms={farms} />
          <SecondStep
            managers={managersList}
            active={step === 1}
            setParam={setParam}
            propertyType={propertyType} />
          <ThirdStep
            active={step === 2}
            card={card}
            setParam={setParam} />
        </div>
      </Box>
      <Grid
        item
        xs={12}
        className={classes.stepperFooterStyle}>
        {step === 1 || step === 2 ? (
          <CustomButton
            extStyle={classes.buttonSpace}
            fullWidth
            disabled={step === 0 || loader}
            bg={colorTheme.ORANGE}
            onClick={() => dispatch(actionSetStep(-1))}>
            <Text
              size={16}
              variant="body1">
              Назад
            </Text>
          </CustomButton>
        ) : null}
        {step === 2 ? (
          <CustomButton
            fullWidth
            disabled={loader}
            bg={colorTheme.ORANGE}
            onClick={onSubmit}>
            <Text
              size={16}
              variant="body1">
              Добавить
            </Text>
          </CustomButton>
        ) : (
          <CustomButton
            fullWidth
            disabled={!validStep}
            bg={colorTheme.ORANGE}
            onClick={() => dispatch(actionSetStep(1))}>
            <Text
              size={16}
              variant="body1">
              Продолжить
            </Text>
          </CustomButton>
        )}
      </Grid>
    </div>
  );
}

StepperCard.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.func,
};

export default memo(StepperCard);
