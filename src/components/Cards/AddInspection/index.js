import {
  memo, useCallback, useEffect, useContext, useReducer,
} from "react";
import * as PropTypes from "prop-types";
import {
  Box, Button, InputAdornment, TextField,
} from "@material-ui/core";
import classnames from "classnames";
import isEmpty from "lodash/isEmpty";
import {makeStyles, useTheme} from "@material-ui/styles";
import {useRouteMatch} from "react-router";
import {useSnackbar} from "notistack";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {useHistory} from "react-router-dom";
import Text from "../../inputs/Text";
import CalendarIcon from "../../icons/calendar";
import DateModal from "../../modals/DatePicker";
import TextFieldDropdown from "../../inputs/TextFieldDropdown";
import LoginField from "../../icons/loginField";
import InspectionIcon from "../../icons/inspection";
import styles from "./styles";
import CustomButton from "../../inputs/CustomButton";
import AddRoundIcon from "../../icons/add_round";
import {getTimeString} from "../../../common/utils";
import {FarmsContext} from "../../../providers/Farms";
import CowIcon from "../../icons/cow";
import {
  initialState,
  reducer,
  actionSetCard,
  actionInit,
  actionOpenDate,
  actionLoad,
  actionSetOption,
  actionSetError,
} from "./reducer";
import {getData, postData} from "../../../common/api/request";
import {ERRORS, USERS_LIMIT} from "../../../common/vars";
import RoundLoader from "../../Loaders/RoundLoader";
import {ProfileContext} from "../../../providers/Profile";

const useStyles = makeStyles(styles);

const types = [
  {
    label: "Простой осмотр",
    value: "base",
  },
  {
    label: "Осмотр копыт",
    value: "hoofs",
  },
];

function AddInspectionCard({onClose, updateAudits}) {
  const classes = useStyles();
  const {props: colorTheme, text} = useTheme();
  const match = useRouteMatch(["/audit/barn/:barnId", "/audit/:farmId"]);
  const {barns: farmBarns} = useContext(FarmsContext);
  const {profile} = useContext(ProfileContext);
  const {enqueueSnackbar: openPar} = useSnackbar();
  const [{
    card, barns, openDate, managers, load, options, error,
  }, dispatch] = useReducer(reducer, initialState(), initialState);
  const history = useHistory();
  const isManager = profile?.role === "manager";

  const initialData = useCallback(async () => {
    try {
      if (!isManager) {
        const {payload: farmUsers} = await getData("/users", {limit: USERS_LIMIT});
        dispatch(actionInit(farmBarns, match, farmUsers));
      } else {
        dispatch(actionInit(farmBarns, match, null, profile));
      }
    } catch (err) {
      console.error(err);
    }
  }, [isManager]);

  useEffect(() => {
    initialData();
  }, [isManager]);

  const openDatePicker = useCallback(() => dispatch(actionOpenDate(true)), []);
  const closeDatePicker = useCallback(() => dispatch(actionOpenDate(false)), []);

  const setCardProperties = useCallback((name, value) => {
    const result = {...card, [name]: value};
    dispatch(actionSetError(null));
    dispatch(actionSetCard(result));
  }, [card]);

  const setDate = useCallback((date) => {
    setCardProperties("date", date);
  }, [card]);

  const onSelect = useCallback((name) => (ev, target) => {
    if (target) {
      setCardProperties(name, target.value);
      dispatch(actionSetOption({[name]: target}));
    } else {
      setCardProperties(name, null);
      dispatch(actionSetOption({[name]: null}));
    }
  }, [card]);

  const onSubmit = useCallback(async () => {
    try {
      const fields = ["barnId", "date", "type", "managerId"];
      const errorList = {};
      const cardFields = [];
      for (const [key, val] of Object.entries(card)) {
        cardFields.push(key);
        if (!val) {
          errorList[key] = true;
        }
      }
      fields.forEach((el) => {
        if (!cardFields.includes(el)) {
          errorList[el] = true;
        }
      });
      if (!isEmpty(errorList)) {
        return dispatch(actionSetError(errorList));
      }
      dispatch(actionLoad(true));
      const res = await postData("/audit", {body: card});
      if (res?.payload) {
        openPar("Осмотр добавлен", {variant: "success"});
        setTimeout(() => {
          dispatch(actionLoad(false));
          updateAudits().then(() => {
            const url = `/audit/card/${res.payload.uuid}`;
            history.push(url);
          });
          onClose();
        }, 400);
      } else {
        openPar(ERRORS.UNKNOWN, {variant: "error"});
        dispatch(actionLoad(false));
      }
    } catch (e) {
      console.error(e);
      openPar(ERRORS.UNKNOWN, {variant: "error"});
      dispatch(actionLoad(false));
    }
    return null;
  }, [card, onClose]);

  return (
    <Box
      className={classes.container}
      align="center">
      <Box mb={1}>
        <Text
          align="center"
          noWrap
          size={20}
          weight={700}>
          Карточка осмотра
        </Text>
      </Box>
      <Box mb={3}>
        <Text
          align="center"
          noWrap
          size={14}
          weight={300}>
          Укажите необходимые данные
        </Text>
        <Text
          align="center"
          size={14}
          weight={300}>
          необходимые поля помечены*
        </Text>
      </Box>
      <Box
        pb={2}
        mb={3}
        position="relative">
        <Box mb={1.5}>
          <Autocomplete
            onChange={onSelect("barnId")}
            options={barns}
            value={options.barnId}
            freeSolo
            className={classnames(classes.autocompleteStyle, classes.autoCompleteCows)}
            getOptionSelected={(opt, item) => opt.label === item.label}
            getOptionLabel={(opt) => opt.label}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CowIcon />
                    </InputAdornment>
                  ),
                }}
                error={Boolean(error?.barnId)}
                className={classes.textFieldRootAutocomplete}
                placeholder="Выбрать коровник"
                variant="outlined" />
            )} />
        </Box>
        <Box mb={1.5}>
          <Button
            fullWidth
            onClick={openDatePicker}
            disableRipple
            className={classes.datePickerCardButton}
            variant="outlined"
            startIcon={<CalendarIcon />}>
            <Text
              noWrap
              weight={300}
              size={14}
              color={text.primary}>
              {getTimeString(card.date)}
            </Text>
          </Button>
        </Box>
        {!isManager ? (
          <Box mb={1.5}>
            <Autocomplete
              onChange={onSelect("managerId")}
              options={managers}
              value={options.managerId}
              freeSolo
              className={classnames(classes.autocompleteStyle, classes.autoCompleteOthers)}
              getOptionSelected={(opt, item) => opt.label === item.label}
              getOptionLabel={(opt) => opt.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LoginField />
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(error?.managerId)}
                  className={classes.textFieldRootAutocomplete}
                  placeholder="Выбрать оператора"
                  variant="outlined" />
              )} />
          </Box>
        ) : null}
        <Box>
          <TextFieldDropdown
            error={Boolean(error?.type)}
            fieldName="type"
            placeholder="Тип осмотра"
            onChange={setCardProperties}
            Icon={InspectionIcon}
            options={types} />
        </Box>
        {error ? (
          <Box className={classes.errorTitle}>
            <Text
              align="center"
              size={13}
              weight={300}
              color="red">
              Не все поля заполнены
            </Text>
          </Box>
        ) : null}
      </Box>
      <CustomButton
        fullWidth
        disabled={load}
        extStyle={classes.asideActionButton}
        bg={colorTheme.ORANGE}
        onClick={onSubmit}>
        {load ? (
          <Box className={classes.loaderContainer}>
            <RoundLoader />
          </Box>
        ) : null}
        <Box
          display="flex"
          alignItems="center"
          mr={1}>
          <AddRoundIcon />
        </Box>
        <Text variant="body1">
          Добавить осмотр
        </Text>
      </CustomButton>
      <DateModal
        format="YYYY-MM-DD"
        autoOk
        disableFuture
        date={card.date}
        onSelect={setDate}
        onOpen={openDatePicker}
        open={openDate}
        dismiss={closeDatePicker} />
    </Box>
  );
}

AddInspectionCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateAudits: PropTypes.func.isRequired,
};

export default memo(AddInspectionCard);
