import * as PropTypes from "prop-types";
import {memo} from "react";
import Text from "../inputs/Text";

function ViewTitle({text}) {
  return (
    <Text
      weight={700}
      size={28}>
      {text}
    </Text>
  );
}

ViewTitle.propTypes = {
  text: PropTypes.string,
};

export default memo(ViewTitle);
