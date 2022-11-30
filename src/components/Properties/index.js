import {
  Fragment, memo, useState, useCallback, useEffect, useContext,
} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {useHistory, useRouteMatch} from "react-router";
import {Box, useTheme} from "@material-ui/core";
import classnames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import styles from "./styles";
import GPSIcon from "../icons/gps";
import Text from "../inputs/Text";
import {FarmsContext} from "../../providers/Farms";

const useStyles = makeStyles(styles);

function PropertiesList({closeDrawer}) {
  const theme = useTheme();
  const classes = useStyles();
  const {farms: farmList} = useContext(FarmsContext);
  const [open, setOpen] = useState("");
  const match = useRouteMatch(["/:routeType/barn/:barnSlug", "/:routeType/:farmId", "/:routeType"]);
  const history = useHistory();

  const showList = useCallback((slug) => {
    let result;
    if (open === slug) {
      result = "";
    } else {
      result = slug;
    }
    setOpen(result);
  }, [open]);

  useEffect(() => {
    if (farmList?.length > 0) {
      let slug = "";
      if (match?.params?.barnSlug) {
        const {barnSlug} = match?.params;
        for (let i = 0; i < farmList.length; i++) {
          if (farmList[i].barns.length > 0) {
            for (let k = 0; k < farmList[i].barns.length; k++) {
              if (farmList[i].barns[k].slug === barnSlug) {
                slug = farmList[i].slug;
                break;
              }
            }
          }
        }
      }
      if (match?.params?.farmId) {
        slug = match.params.farmId;
      }
      showList(slug);
    }
  }, [farmList]);

  const handleClick = useCallback((slug, len) => () => {
    const typeSlug = ["audit", "contacts"].includes(match?.params?.routeType) ? match?.params?.routeType : "audit";
    const {location} = history;

    let url = `/${typeSlug}/barn/${slug}`;
    if (len) {
      showList(slug);
      url = `/${typeSlug}/${slug}`;
    }
    if (url === location.pathname) {
      return null;
    }
    history.push(url);
    if (typeof closeDrawer === "function") {
      closeDrawer();
    }
  }, [open, history, match]);

  return (
    <List
      component="nav"
      className={classes.rootPropertiesList}>
      {farmList?.length > 0 ? farmList.map((farm) => {
        const barnsLen = farm.barns.length > 0;
        return (
          <Fragment key={farm.uuid}>
            <ListItem
              button
              disableRipple
              classes={{
                button: classes.openedParentHover,
              }}
              className={classnames(classes.listStyle, classes.listParent, {
                [classes.openedParent]: farm.slug === match?.params?.farmId,
              })}
              onClick={handleClick(farm.slug, true)}>
              <Box
                display="flex"
                alignItems="center">
                <ListItemIcon className={classes.listIconParentStyle}>
                  <GPSIcon color={open === farm.slug ? theme.props.BLUE.main : ""} />
                </ListItemIcon>
                <Text
                  lineHeight={1.41}
                  color={open === farm.slug ? theme.props.BLUE.main : theme.palette.text.primary}
                  weight={700}
                  variant="body2">
                  {farm.title}
                </Text>
              </Box>
              {/* eslint-disable-next-line no-nested-ternary */}
              {barnsLen && (
                <ExpandMore
                  htmlColor={open === farm.slug ? theme.props.BLUE.main : ""}
                  className={classnames(classes.expandStyle, {
                    [classes.rotateExpand]: open === farm.slug,
                  })} />
              )}
            </ListItem>
            <Collapse
              in={open === farm.slug}
              timeout="auto"
              unmountOnExit>
              {farm?.barns?.map((barn) => (
                <List
                  key={barn.uuid}
                  className={classes.childWarpper}
                  disablePadding>
                  <ListItem
                    button
                    disableRipple
                    onClick={handleClick(barn.slug)}
                    className={classnames(classes.listStyle, classes.listStyleChild)}>
                    <Box mr={1}>
                      <ListItemIcon className={classes.listIconChildStyle}>
                        <RemoveIcon />
                      </ListItemIcon>
                    </Box>
                    <Text
                      lineHeight={1.41}
                      weight={barn.slug === match?.params?.barnSlug ? 700 : 300}
                      variant="body2">
                      {barn.title}
                    </Text>
                  </ListItem>
                </List>
              ))}
            </Collapse>
          </Fragment>
        );
      }) : (
        <Text
          lineHeight={1.41}
          variant="body1">
          Список хозяйств пуст
        </Text>
      )}
    </List>
  );
}

PropertiesList.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default memo(PropertiesList);
