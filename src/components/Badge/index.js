import {memo} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Badge as BadgeIcon} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  badgeRoot: {
    "& .MuiBadge-badge": {
      border: `2px solid ${theme.palette.common.white}`,
      padding: "0 4px",
      backgroundColor: theme.props.ORANGE.main,
      color: theme.palette.common.white,
    },
  },
}));

function Badge(props) {
  const {children, count = 0} = props;
  const classes = useStyles();

  return (
    <BadgeIcon
      className={classes.badgeRoot}
      badgeContent={count}>
      {children}
    </BadgeIcon>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number,
};

export default memo(Badge);
