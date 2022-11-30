import {memo, useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, InputAdornment, OutlinedInput} from "@material-ui/core";
import {useSnackbar} from "notistack";
import styles from "./styles";
import Text from "../inputs/Text";
import CustomButton from "../inputs/CustomButton";
import RoundLoader from "../Loaders/RoundLoader";
import {postData} from "../../common/api/request";
import {ERRORS} from "../../common/vars";
import LoginField from "../icons/loginField";
import PasswordField from "../icons/passwordField";

const useStyles = makeStyles(styles);

function EditUser(props) {
  const {
    uuid, userName, onClose, updateUsers,
  } = props;
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const [load, setLoad] = useState(false);
  const [card, setCard] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);

  const onChange = useCallback((name) => ({target: {value}}) => {
    setError(null);
    if (name === "passwordConfirm") {
      return setPasswordConfirm(value);
    }
    const result = {...card, [name]: value};
    setCard(result);
    return null;
  }, [card]);

  const onSubmit = useCallback(async () => {
    try {
      if (!card) {
        return onClose();
      }
      if (card) {
        if (card?.password && card?.password !== passwordConfirm) {
          return setError("Пароли не совпадают");
        }
      }
      setLoad(true);
      const body = {...card};
      const response = await postData(`/users/${uuid}`, {body});
      if (response?.payload) {
        setTimeout(() => {
          setLoad(false);
          openBar("Данные успешно обновлены", {variant: "success"});
          updateUsers();
          onClose();
        }, 400);
      } else {
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      console.error(err);
      openBar(err?.message || ERRORS.UNKNOWN, {variant: "error"});
      setLoad(false);
    }
    return null;
  }, [card, passwordConfirm, uuid]);

  return (
    <div className={classes.rootEdit}>
      <Box mb={3}>
        <Text
          align="center"
          size={20}
          weight={700}>
          Карточка редактирования пользователя
        </Text>
      </Box>
      <Box mb={2}>
        <OutlinedInput
          autoComplete="new-name"
          type="text"
          name="name"
          defaultValue={userName}
          className={classes.textFieldRoot}
          onChange={onChange("name")}
          placeholder="Новое имя"
          startAdornment={(
            <InputAdornment position="start">
              <LoginField />
            </InputAdornment>
          )} />
      </Box>
      <Box
        pb={2.5}
        position="relative">
        <Box mb={2}>
          <OutlinedInput
            error={Boolean(error)}
            autoComplete="new-password"
            type="password"
            name="password"
            className={classes.textFieldRoot}
            onChange={onChange("password")}
            placeholder="Пароль"
            startAdornment={(
              <InputAdornment position="start">
                <PasswordField />
              </InputAdornment>
            )} />
        </Box>
        <Box>
          <OutlinedInput
            error={Boolean(error)}
            autoComplete="password"
            type="password"
            className={classes.textFieldRoot}
            onChange={onChange("passwordConfirm")}
            placeholder="Проверка пароля"
            startAdornment={(
              <InputAdornment position="start">
                <PasswordField />
              </InputAdornment>
            )} />
        </Box>
        {error ? (
          <Box className={classes.errorTitle}>
            <Text
              align="center"
              size={13}
              weight={300}
              color="red">
              {error}
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
        <Text variant="body1">
          Изменить
        </Text>
      </CustomButton>
    </div>
  );
}

EditUser.propTypes = {
  uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
};

export default memo(EditUser);
