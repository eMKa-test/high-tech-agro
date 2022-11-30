import {memo, Fragment} from "react";
import {makeStyles} from "@material-ui/styles";
import {Box, Hidden} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import {useRouteMatch} from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./styles";
import CustomLink from "../components/inputs/CustomLink";
import theme from "../common/theme";
import Text from "../components/inputs/Text";
import PropertyIcon from "../components/icons/property";
import InspectionIcon from "../components/icons/inspection";

const useStyles = makeStyles(styles);

const getUrl = (params, defaultUrl) => {
  if (defaultUrl === `/${params?.type}` || params?.type === "settings") {
    return defaultUrl;
  }
  if (params?.farmId && params?.farmId !== "card") {
    return `${defaultUrl}/${params.farmId}`;
  }
  if (params?.barnId) {
    return `${defaultUrl}/barn/${params.barnId}`;
  }
  return defaultUrl;
};

function Aside(props) {
  const {
    open, desktop, dismiss, children,
  } = props;
  const match = useRouteMatch(["/:type/barn/:barnId", "/:type/:farmId", "/:type"]);

  const classes = useStyles();

  return (
    <Fragment>
      <Hidden smDown>
        <Drawer
          className={classes.drawerDesktop}
          variant="persistent"
          anchor="left"
          open={desktop}
          classes={{
            paper: classes.drawerDesktopPaper,
          }}>
          <div className={classes.drawerHeader}>
            <Logo />
          </div>
          <Box
            className={classes.asideContent}
            mt={3}>
            {children}
          </Box>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <Drawer
          className={classes.drawer}
          anchor="right"
          open={open}
          onClose={dismiss}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <Box mb={3}>
            <Box
              mr={1}
              my={0}>
              <CustomLink
                type="button"
                underline="none"
                weight={700}
                padding="0 20px"
                color={theme.text.primary}
                active={match?.params?.type === "audit"}
                href={getUrl(match?.params, "/audit")}>
                <InspectionIcon />
                <Text
                  margin="0 0 0 16px"
                  variant="body2">
                  Осмотры
                </Text>
              </CustomLink>
            </Box>
            <Box
              mr={1}
              my={0}>
              <CustomLink
                type="button"
                underline="none"
                weight={700}
                padding="0 20px"
                color={theme.text.primary}
                active={match?.params?.type === "contacts"}
                href={getUrl(match?.params, "/contacts")}>
                <PropertyIcon />
                <Text
                  margin="0 0 0 16px"
                  variant="body2">
                  Контакты
                </Text>
              </CustomLink>
            </Box>
          </Box>
          {children}
        </Drawer>
      </Hidden>
    </Fragment>
  );
}

Aside.propTypes = {
  open: PropTypes.bool.isRequired,
  desktop: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default memo(Aside);
