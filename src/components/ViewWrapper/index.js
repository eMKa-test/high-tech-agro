import {memo, Fragment} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import LinearIndeterminate from "../Loaders/LinearLoader";

const useStyles = makeStyles((theme) => ({
  rootContent: {
    flexGrow: 1,
    overflowY: "auto",
    padding: theme.spacing(4, 2, 2, 3),
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  loaderHolder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    // height: theme.spacing(1),
  },
}));

function ViewWrapper({children, loading}) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.loaderHolder}>
        {loading ? (
          <LinearIndeterminate />
        ) : null}
      </div>
      <div className={classes.rootContent}>
        {children}
      </div>
    </Fragment>
  );
}

ViewWrapper.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
};

export default memo(ViewWrapper);
