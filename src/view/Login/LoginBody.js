import {
  memo, useCallback, useEffect, useRef,
} from "react";
import {
  Box, CardContent, InputAdornment, OutlinedInput,
} from "@material-ui/core";
import {useTheme, makeStyles} from "@material-ui/core/styles";
import axios from "axios";
import {useSnackbar} from "notistack";
import LoginFieldIcon from "../../components/icons/loginField";
import PasswordFieldIcon from "../../components/icons/passwordField";
import CustomButton from "../../components/inputs/CustomButton";
import Text from "../../components/inputs/Text";
import useFocus from "../../common/hooks/useFocus";
import styles from "./styles";

const useStyles = makeStyles(styles);

function LoginBody() {
  const formRef = useRef(null);
  const [inFocus, onFocus, onBlur] = useFocus();
  const {enqueueSnackbar} = useSnackbar();
  const classes = useStyles();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const {current: form} = formRef;
    const {email: {value: mailVal}, password: {value: pwdVal}} = form.elements;
    axios.post("/login", {
      email: mailVal,
      password: pwdVal,
    }).then(({data: res}) => {
      if (res?.payload) {
        window.location.href = "/";
      } else {
        enqueueSnackbar(res.message, {variant: "error"});
      }
    }).catch((err) => {
      enqueueSnackbar(err?.response?.data?.message || "Неизвестная ошибка. Попробуйте позже.", {variant: "error"});
    });
  }, [formRef]);

  const onKey = useCallback((e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  }, [inFocus]);

  useEffect(() => {
    if (inFocus) {
      document.addEventListener("keypress", onKey);
    }
    return () => {
      document.removeEventListener("keypress", onKey);
    };
  }, [inFocus]);

  const {props: colorTheme} = useTheme();

  return (
    <CardContent>
      <form
        ref={formRef}
        onSubmit={onSubmit}>
        <Box mb={5}>
          <Box mb={2}>
            <OutlinedInput
              required
              autoComplete
              type="text"
              onBlur={onBlur}
              onFocus={onFocus}
              name="email"
              className={classes.textFieldRoot}
              placeholder="Ваша почта*"
              startAdornment={(
                <InputAdornment position="start">
                  <LoginFieldIcon />
                </InputAdornment>
              )} />
          </Box>
          <Box mb={2}>
            <OutlinedInput
              required
              autoComplete
              type="password"
              onBlur={onBlur}
              onFocus={onFocus}
              name="password"
              className={classes.textFieldRoot}
              placeholder="Ваш пароль*"
              startAdornment={(
                <InputAdornment position="start">
                  <PasswordFieldIcon />
                </InputAdornment>
              )} />
          </Box>
        </Box>
        <CustomButton
          type="submit"
          fullWidth
          bg={colorTheme.ORANGE}>
          <Text variant="body2">Войти в сервис</Text>
        </CustomButton>
      </form>
    </CardContent>
  );
}

export default memo(LoginBody);
