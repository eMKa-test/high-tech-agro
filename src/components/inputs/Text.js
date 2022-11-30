import {memo, useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    color: (props) => props.color || props.color.main,
    lineHeight: (props) => props.lineHeight,
    fontWeight: (props) => props.weight,
    fontSize: (props) => props.size,
  },
});

function Text(props) {
  const {
    children,
    margin = {},
    align = "left",
    color = "",
    component = "",
    lineHeight = "inherit",
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = "body1",
    weight = "inherit",
    size = "",
  } = props;
  const [text, setText] = useState("");

  useEffect(() => {
    if (Array.isArray(children)) {
      setText(children.join(""));
    }
    if (typeof children === "string" || typeof children === "number") {
      setText(children);
    }
  }, [children]);

  const styles = useStyles({
    color, weight, size, lineHeight,
  });

  return (
    <Typography
      classes={{
        root: styles.root,
      }}
      style={{margin}}
      component={component}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      paragraph={paragraph}
      variant={variant}
      align={align}>
      {text}
    </Typography>
  );
}

Text.propTypes = {
  component: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
  gutterBottom: PropTypes.bool,
  paragraph: PropTypes.bool,
  noWrap: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  align: PropTypes.string,
  margin: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    main: PropTypes.string,
    text: PropTypes.string,
  })]),
};

export default memo(Text);
