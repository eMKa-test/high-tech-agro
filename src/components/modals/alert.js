import {memo} from "react";
import {Alert as AlertPaper, AlertTitle} from "@material-ui/lab";
import Text from "../inputs/Text";

function Alert(props) {
  const {
    variant = "standard",
    title,
    message,
    color = "warning",
  } = props;

  return (
    <AlertPaper
      variant={variant}
      severity={color}>
      {title ? (
        <AlertTitle>{title}</AlertTitle>
      ) : null}
      <Text>
        {message}
      </Text>
    </AlertPaper>
  );
}

Alert.propTypes = {
  color: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.string,
};

export default memo(Alert);
