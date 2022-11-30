import {
  memo, useCallback, useContext, useEffect, useReducer,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, Grid, Divider} from "@material-ui/core";
import {useSnackbar} from "notistack";
import styles from "./styles";
import CustomButton from "../../inputs/CustomButton";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import Text from "../../inputs/Text";
import {postData} from "../../../common/api/request";
import LinearProgress from "../../Loaders/LinearLoader";
import {
  reducer,
  initialState,
  actionLoader,
  actionSetStep,
  actionCard,
  actionInit,
  actionValidateStep,
} from "./reducer";
import {FarmsContext} from "../../../providers/Farms";
import {ERRORS} from "../../../common/vars";
import eventEmitter from "../../../common/utils/emitter";

const useStyles = makeStyles(styles);

function StepperCard(props) {
  const {onClose, children} = props;
  const [{
    step,
    card,
    loader,
    farms,
    barns,
    shift,
    validName,
  }, dispatch] = useReducer(reducer, initialState(), initialState);
  const {enqueueSnackbar} = useSnackbar();
  const {props: colorTheme} = useTheme();
  const {farms: initialFarms} = useContext(FarmsContext);

  const classes = useStyles();

  useEffect(() => {
    dispatch(actionInit(initialFarms));
  }, []);

  const setParam = useCallback((name, field) => {
    const fiedlValue = field ? field.trim() : field;
    const result = {[name]: fiedlValue};
    dispatch(actionCard(result, name));
  }, []);

  const nextStep = useCallback(() => {
    dispatch(actionSetStep(1));
  }, [card]);

  const onSubmit = useCallback(async () => {
    try {
      dispatch(actionLoader(true));
      const body = {...card};
      const res = await postData("/contacts", {body});
      if (res?.payload) {
        const message = `Успешно создан контакт ${res.payload.name}`;
        enqueueSnackbar(message, {variant: "success"});
        setTimeout(() => {
          eventEmitter.emit("updateContacts");
          dispatch(actionLoader(false));
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
            width: `${100 * 2}%`,
            left: `${shift}%`,
          }}>
          <FirstStep
            validName={validName}
            card={card}
            active={step === 0}
            setParam={setParam} />
          <SecondStep
            properties={{Farm: farms, Barn: barns}}
            active={step === 1}
            setParam={setParam} />
        </div>
      </Box>
      <Grid
        item
        xs={12}
        className={classes.stepperFooterStyle}>
        {step === 1 ? (
          <CustomButton
            disabled={loader}
            fullWidth
            extStyle={classes.buttonSpace}
            bg={colorTheme.ORANGE}
            onClick={() => dispatch(actionSetStep(-1))}>
            <Text
              size={16}
              variant="body1">
              Назад
            </Text>
          </CustomButton>
        ) : null}
        {step === 1 ? (
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
            disabled={!card.name}
            bg={colorTheme.ORANGE}
            onClick={nextStep}>
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
