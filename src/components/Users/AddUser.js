import {memo, useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, InputAdornment, OutlinedInput} from "@material-ui/core";
import {useSnackbar} from "notistack";
import styles from "./styles";
import CustomButton from "../inputs/CustomButton";
import RoundLoader from "../Loaders/RoundLoader";
import AddRoundIcon from "../icons/add_round";
import Text from "../inputs/Text";
import Modal from "../modals/modal";
import {postData} from "../../common/api/request";
import {screenMediaRule} from "../../common/utils";
import LoginField from "../icons/loginField";
import MailIcon from "../icons/mail";
import PasswordField from "../icons/passwordField";
import {ERRORS} from "../../common/vars";

const useStyles = makeStyles(styles);

function AddUser({updateUsers}) {
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const media = screenMediaRule(720);

  const [load, setLoad] = useState(false);
  const [addUser, setOpenAddUser] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const openAddUser = useCallback(() => setOpenAddUser(true), []);
  const closeAddUser = useCallback(() => setOpenAddUser(false), []);

  const onChange = useCallback((name) => ({target: {value}}) => {
    setError(null);
    const result = {...user, [name]: value};
    setUser(result);
    return null;
  }, [user]);

  const onSubmit = useCallback(async () => {
    try {
      if (!user) {
        return closeAddUser();
      }
      const fields = ["name", "email", "password"];
      const result = {};
      fields.forEach((el) => {
        if (!user[el]) {
          result[el] = "Не заполнено поле";
        }
      });
      if (Object.values(result)?.length > 0) {
        return setError(result);
      }
      setLoad(true);
      const response = await postData("/users", {body: user, errorInterceptor: true});
      if (response?.payload) {
        setTimeout(() => {
          openBar("Пользователь успешно создан", {variant: "success"});
          updateUsers();
          setLoad(false);
          setOpenAddUser(false);
        }, 400);
      }
      setLoad(false);
    } catch (err) {
      if (err?.response?.status === 302) {
        openBar("Пользователь с данной почтой уже зарегистрирован", {variant: "error"});
      } else if (err?.response?.status === 403) {
        openBar("Нет полномочий добавлять пользователей", {variant: "error"});
      } else {
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }
      setLoad(false);
    }
    return null;
  }, [user]);

  return (
    <Box className={classes.addUserContainer}>
      <CustomButton
        fullWidth={media}
        title="Добавить пользователя"
        extStyle={classes.addUserButton}
        bg={colorTheme.ORANGE}
        onClick={openAddUser}>
        <Box
          display="flex"
          alignItems="center"
          mr={1}>
          <AddRoundIcon />
        </Box>
        <Text variant="body1">
          Добавить пользователя
        </Text>
      </CustomButton>
      <Modal
        onClose={closeAddUser}
        open={addUser}>
        <div className={classes.rootEdit}>
          <Box mb={3}>
            <Text
              align="center"
              size={20}
              weight={700}>
              Карточка добавления пользователя
            </Text>
          </Box>
          <Box position="relative">
            <Box mb={2}>
              <OutlinedInput
                error={Boolean(error?.name)}
                type="text"
                className={classes.textFieldRoot}
                onChange={onChange("name")}
                autoComplete="new-name"
                name="name"
                placeholder="Имя"
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
                  error={Boolean(error?.email)}
                  type="text"
                  className={classes.textFieldRoot}
                  onChange={onChange("email")}
                  autoComplete="new-email"
                  name="email"
                  placeholder="Почта"
                  startAdornment={(
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  )} />
              </Box>
              <Box>
                <OutlinedInput
                  error={Boolean(error?.password)}
                  autoComplete="new-password"
                  name="password"
                  type="password"
                  className={classes.textFieldRoot}
                  onChange={onChange("password")}
                  placeholder="Пароль"
                  startAdornment={(
                    <InputAdornment position="start">
                      <PasswordField />
                    </InputAdornment>
                  )} />
              </Box>
            </Box>
            {error ? (
              <Box className={classes.errorTitle}>
                <Text
                  noWrap
                  align="center"
                  color="red"
                  size={14}>
                  Все поля должны быть заполнены
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
              Создать
            </Text>
          </CustomButton>
        </div>
      </Modal>
    </Box>
  );
}

AddUser.propTypes = {
  updateUsers: PropTypes.func.isRequired,
};

export default memo(AddUser);
