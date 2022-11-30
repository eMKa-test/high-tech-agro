import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {useHistory, useRouteMatch} from "react-router";
import {Box, useTheme} from "@material-ui/core";
import classnames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import styles from "./styles";
import Text from "../inputs/Text";
import CowIcon from "../icons/cow";

const useStyles = makeStyles(styles);

const routePaths = ["/audit/card/:auditId/cow/:cowId", "/audit/card/:auditId"];

function Animals(props) {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const {params} = useRouteMatch(routePaths);
  const {animals, closeDrawer} = props;

  const toCowAudit = useCallback((cowUuid) => () => {
    const url = `/audit/card/${params.auditId}/cow/${cowUuid}`;
    closeDrawer();
    history.push(url);
  }, [closeDrawer]);

  return (
    <List
      component="nav"
      className={classes.rootAnimals}>
      {animals.map((cow, i) => (
        <ListItem
          key={String(i)}
          button
          disableRipple
          classes={{
            button: classes.openedParentHover,
          }}
          className={classnames(classes.listStyle, classes.listParent, {
            [classes.openedParent]: params.cowId === cow.uuid,
          })}
          onClick={toCowAudit(cow.uuid)}>
          <Box
            display="flex"
            alignItems="center">
            <ListItemIcon className={classes.listIconParentStyle}>
              <CowIcon color={theme.palette.text.primary} />
            </ListItemIcon>
            <Text
              lineHeight={1.41}
              color={theme.palette.text.primary}
              weight={700}
              variant="body2">
              {`Корова №${cow.number}`}
            </Text>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

Animals.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  animals: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    auditId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })),
};

export default memo(Animals);
