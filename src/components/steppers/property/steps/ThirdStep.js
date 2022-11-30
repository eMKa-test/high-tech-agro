import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {Box, InputAdornment, OutlinedInput} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import InputMask from "react-input-mask";
import MailIcon from "../../../icons/mail";
import PhoneIcon from "../../../icons/phone";
import Text from "../../../inputs/Text";
import styles from "../styles";
import LoginFieldIcon from "../../../icons/loginField";

const useStyles = makeStyles(styles);

function ThirdStep(props) {
  const {setParam, active} = props;
  const classes = useStyles();

  const onChange = useCallback((name) => ({target: {value}}) => {
    setParam(name, value);
  }, []);

  return (
    <div className={classes.stepItem}>
      <Box
        mt={2}
        mb={4.5}>
        <Text
          align="center"
          weight={700}
          size={20} >
          Заполните контактную информацию
        </Text>
      </Box>
      <div
        className={classnames(classes.stepWrapper, {
          [classes.unactiveStep]: !active,
        })}>
        <OutlinedInput
          type="text"
          className={classes.textFieldRoot}
          onChange={onChange("name")}
          placeholder="ФИО руководителя"
          startAdornment={(
            <InputAdornment position="start">
              <LoginFieldIcon />
            </InputAdornment>
          )} />
        <Box mt={2}>
          <OutlinedInput
            type="text"
            className={classes.textFieldRoot}
            onChange={onChange("email")}
            placeholder="Почта"
            startAdornment={(
              <InputAdornment position="start">
                <MailIcon />
              </InputAdornment>
            )} />
        </Box>
        <Box mt={2}>
          <InputMask
            mask="+7(999)-999-99-99"
            alwaysShowMask
            onChange={onChange("tel")}>
            {(inputProps) => (
              <OutlinedInput
                {...inputProps}
                type="tel"
                className={classes.textFieldRoot}
                placeholder="Телефон"
                startAdornment={(
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )} />
            )}
          </InputMask>
        </Box>
      </div>
    </div>
  );
}

ThirdStep.propTypes = {
  active: PropTypes.bool,
  setParam: PropTypes.func,
};

export default memo(ThirdStep);
