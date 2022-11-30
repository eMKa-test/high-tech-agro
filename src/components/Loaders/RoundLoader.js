import {memo} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    color: ({color}) => color || theme.props.BLUE.main,
  },
}));

function RoundLoader({color}) {
  const classes = useStyles({color});

  return (
    <CircularProgress className={classes.root} />
  );
}

RoundLoader.propTypes = {
  color: PropTypes.string,
};

export default memo(RoundLoader);
