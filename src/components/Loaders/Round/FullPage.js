import {memo} from "react";
import * as PropTypes from "prop-types";
import {makeStyles, useTheme} from "@material-ui/styles";
import classnames from "classnames";
import RoundLoader from "../RoundLoader";
import styles from "./styles";

const useStyles = makeStyles(styles);

function FullPageLoader({load}) {
  const {props: colorTheme} = useTheme();
  const classes = useStyles();

  return (
    <div
      className={classnames(classes.pageLoader, {
        [classes.activeLoader]: load,
        [classes.unActiveLoader]: !load,
      })}>
      <RoundLoader color={colorTheme.ORANGE.main} />
    </div>
  );
}

FullPageLoader.propTypes = {
  load: PropTypes.bool.isRequired,
};

export default memo(FullPageLoader);
