import {
  Fragment, useState, useCallback, memo,
} from "react";
import Menu from "@material-ui/core/Menu";
import classnames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 191,
    boxShadow: "0px 10px 15px 0px rgba(0, 0, 0, 0.13)",
  },
  root: {
    color: "#3E4954",
    textAlign: "center",
    "& .MuiListItemText-root .MuiTypography-body1": {
      fontSize: 14,
      fontWeight: 400,
    },
    "&:focus": {
      backgroundColor: "#F7F7F7",
    },
  },
  active: {
    backgroundColor: "#F7F7F7",
    color: theme.props.ORANGE.main,
  },
}));

const DropdownMenu = ({
  children, bottomChildren, bottomHandler, list = [], onSelect, active,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const onOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const dismiss = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const _onSelect = useCallback((value) => () => {
    if (typeof onSelect === "function") {
      onSelect(value);
    }
    dismiss();
  }, [onSelect]);

  return (
    <Fragment>
      {React.cloneElement(children, {onClick: onOpen, ...children.props})}
      <Menu
        classes={{
          paper: classes.paper,
        }}
        disableAutoFocusItem
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={dismiss}>
        {list.map((item) => (
          <MenuItem
            className={classnames(classes.root, {
              [classes.active]: active === item.value,
            })}
            disabled={item?.disabled || false}
            disableRipple
            onClick={_onSelect(item.value)}
            key={item.label}>
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
        {list?.length > 0 && bottomChildren ? (
          <Divider />
        ) : null}
        {bottomChildren && (
          <MenuItem
            className={classes.root}
            onClick={bottomHandler}
            disableRipple>
            <ListItemText
              className={classes.listItemStyle}
              primary={bottomChildren} />
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
  bottomChildren: PropTypes.string,
  bottomHandler: PropTypes.func,
  onSelect: PropTypes.func,
  active: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  })),
};

export default memo(DropdownMenu);
