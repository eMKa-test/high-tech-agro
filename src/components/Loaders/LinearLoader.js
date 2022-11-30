import {memo} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: ({height}) => height || 1,
    backgroundColor: theme.props.ORANGE.main,
  },
}));

function LinearIndeterminate({height}) {
  const classes = useStyles({height});

  return (
    <LinearProgress className={classes.root} />
  );
}

LinearIndeterminate.propTypes = {
  height: PropTypes.number,
};

export default memo(LinearIndeterminate);
