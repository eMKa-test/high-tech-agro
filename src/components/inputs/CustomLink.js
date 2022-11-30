import {Link as RouteLink} from "react-router-dom";
import {Link, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: ({color, active}) => (active ? theme.props.ORANGE.main : color),
    fontSize: ({fontSize}) => fontSize,
    fontWeight: ({weight}) => weight,
    lineHeight: ({lineHeight}) => lineHeight,
    padding: ({padding}) => padding || theme.spacing(0, 0.5),
  },
}));

function CustomLink(props) {
  const {
    children = "",
    type = "link",
    href = "#",
    color = "#000",
    active = false,
    underline = "underline",
    fontSize = "inherit",
    lineHeight = "",
    weight = "inherit",
    padding = {},
  } = props;

  const styles = useStyles({
    color, fontSize, weight, active, lineHeight, padding,
  });

  if (type === "link") {
    return (
      <Link
        classes={{
          root: styles.root,
        }}
        underline={underline}
        component={RouteLink}
        to={href}>
        {children}
      </Link>
    );
  }

  return (
    <Button
      classes={{
        root: styles.root,
      }}
      underline={underline}
      component={RouteLink}
      to={href}>
      {children}
    </Button>
  );
}

CustomLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
  type: PropTypes.string,
  lineHeight: PropTypes.string,
  href: PropTypes.string,
  active: PropTypes.bool,
  underline: PropTypes.string,
  fontSize: PropTypes.number,
  padding: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default CustomLink;
