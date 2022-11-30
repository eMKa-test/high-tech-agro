import {memo, useCallback} from "react";
import memoize from "lodash/memoize";
import {Link} from "react-router-dom";
import {useTheme, makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import {Button, lighten} from "@material-ui/core";
import {customButtonStyles} from "./styles";

const checkSize = memoize((val) => (typeof val === "number"));
const useStyles = makeStyles(customButtonStyles);
const stylesSimpleButton = makeStyles(() => ({
  rootContained: {
    width: (props) => props.size || "inherit",
    height: (props) => props.size || "inherit",
    backgroundColor: ({bg}) => bg.main,
    color: ({bg, color}) => color || bg.text,
    "&:hover": {
      backgroundColor: ({bg}) => bg.dark,
    },
  },
  rootOutlined: {
    borderColor: ({bg}) => bg.main,
    color: ({bg}) => bg.main,
    "&:hover": {
      color: ({bg, color}) => color || bg.main,
      borderColor: ({bg}) => bg.main,
      backgroundColor: ({bg}) => lighten(bg.main, 0.9),
    },
  },
}));

const stylesRoundButton = makeStyles(() => ({
  rootContained: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: ({bg}) => bg.main,
    color: ({bg}) => bg.text,
    "&:hover": {
      backgroundColor: ({bg}) => bg.dark,
    },
  },
  rootOutlined: {
    borderColor: ({bg}) => bg.main,
    color: ({bg}) => bg.main,
    "&:hover": {
      borderColor: ({bg}) => bg.main,
      backgroundColor: ({bg}) => lighten(bg.main, 0.9),
    },
  },
  containedSizeSmall: {
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 20,
  },
  containedSizeLarge: {
    width: 56,
    height: 56,
    padding: 0,
    borderRadius: 28,
  },
}));

function CustomButton(props) {
  const theme = useTheme();
  const {
    children,
    fullWidth = false,
    title = "",
    type = "button",
    factor = "simple",
    bg = theme.props.DEFAULT,
    variant = "contained",
    disabled = false,
    rippleEffect = false,
    onClick = () => null,
    size = "medium",
    extStyle = {},
    colorTitle = "",
    href = "",
  } = props;

  const classes = useStyles();
  const styleParams = {bg, size: checkSize && size, color: colorTitle};
  const styles = factor === "round" ? stylesRoundButton(styleParams) : stylesSimpleButton(styleParams);

  const _onClick = useCallback((e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }
  }, [onClick]);

  return (
    <Button
      title={title}
      type={type}
      to={href}
      fullWidth={fullWidth}
      size={checkSize ? "medium" : size}
      classes={{
        contained: styles.rootContained,
        outlined: styles.rootOutlined,
        containedSizeLarge: styles.containedSizeLarge,
        outlinedSizeLarge: styles.containedSizeLarge,
        containedSizeSmall: styles.containedSizeSmall,
        outlinedSizeSmall: styles.containedSizeSmall,
      }}
      onClick={_onClick}
      className={classnames({
        [classes.squareButtonStyle]: factor === "square",
      }, extStyle)}
      variant={variant}
      disabled={disabled}
      component={href ? Link : "button"}
      disableRipple={!rippleEffect}>
      {children}
    </Button>
  );
}

CustomButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  factor: PropTypes.string,
  type: PropTypes.string,
  colorTitle: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  rippleEffect: PropTypes.bool,
  fullWidth: PropTypes.bool,
  bg: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  extStyle: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
};

export default memo(CustomButton);
