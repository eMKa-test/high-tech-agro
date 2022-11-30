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

function FirstStep(props) {
  const {
    setParam, active, validName, card, children, title = "Заполните контактную информацию",
  } = props;
  const classes = useStyles();

  const onChange = useCallback((name) => ({target: {value}}) => {
    setParam(name, value);
  }, [card]);

  return (
    <div className={classes.stepItem}>
      <Box
        mt={2}
        mb={4.5}>
        <Text
          align="center"
          weight={700}
          size={20} >
          {title}
        </Text>
      </Box>
      <div
        className={classnames(classes.stepWrapper, {
          [classes.unactiveStep]: !active,
        })}>
        <OutlinedInput
          type="text"
          defaultValue={card?.name || ""}
          className={classes.textFieldRoot}
          onChange={onChange("name")}
          error={validName}
          placeholder="ФИО"
          startAdornment={(
            <InputAdornment position="start">
              <LoginFieldIcon />
            </InputAdornment>
          )} />
        <Box mt={2}>
          <OutlinedInput
            type="text"
            defaultValue={card?.email || ""}
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
                defaultValue={card?.tel || ""}
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
        {children || null}
      </div>
    </div>
  );
}

FirstStep.propTypes = {
  card: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    tel: PropTypes.string,
  }),
  active: PropTypes.bool,
  title: PropTypes.string,
  validName: PropTypes.bool,
  setParam: PropTypes.func,
  children: PropTypes.node,
};

export default memo(FirstStep);
