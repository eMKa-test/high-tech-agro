import {memo, useCallback, useContext} from "react";
import classnames from "classnames";
import memoize from "lodash/memoize";
import {
  AppBar, Toolbar, Box, Hidden, useMediaQuery,
} from "@material-ui/core";
import {useRouteMatch, useHistory} from "react-router-dom";
import {useTheme, makeStyles} from "@material-ui/styles";
import MenuIcon from "@material-ui/icons/Menu";
import CustomButton from "../components/inputs/CustomButton";
import CustomLink from "../components/inputs/CustomLink";
import styles from "./styles";
import Logo from "../components/Logo";
import UserProfile from "../components/UserProfile";
import theme from "../common/theme";
import Text from "../components/inputs/Text";
import NotifyIcon from "../components/icons/notify";
import MessageIcon from "../components/icons/message";
import SettingsIcon from "../components/icons/settings";
import DropdownMenu from "../components/dropdownMenu";
import {ProfileContext} from "../providers/Profile";

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

const settingsLinks = memoize((role) => {
  const arr = [
    {
      label: "Настройки болезней",
      value: "/settings/ills",
    },
  ];
  if (role === "admin" || role === "ceo") {
    arr.push({
      label: "Настройки пользователей",
      value: "/settings/users",
    });
  }
  return arr;
});

function Header(props) {
  const {desktop, openAside} = props;
  const classes = useStyles();
  const {props: {BLUE_LIGHT, ORANGE}, breakpoints} = useTheme();
  const match = useRouteMatch(["/:type/barn/:barnId", "/:type/:farmId", "/:type"]);
  const changeSize = useMediaQuery(breakpoints.down("xs"));

  const {push} = useHistory();

  const {profile} = useContext(ProfileContext);

  const onSelectSetting = useCallback((href) => {
    push(href);
  }, []);

  return (
    <AppBar
      elevation={0}
      className={classnames(classes.appBar, {
        [classes.appBarShift]: !desktop,
      })}
      position="fixed">
      <Toolbar className={classes.rootToolBar}>
        <Hidden only={["xs", "md", "lg", "xl"]}>
          <Logo />
        </Hidden>
        <Hidden only={["sm", "md", "lg", "xl"]}>
          <Logo icon />
        </Hidden>
        <Hidden smDown>
          <div className={classes.leftItem}>
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
                <Text variant="body2">Осмотры</Text>
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
                <Text variant="body2">Контакты</Text>
              </CustomLink>
            </Box>
          </div>
        </Hidden>
        <div className={classes.rightItem}>
          <Box
            ml={changeSize ? 1 : 2}>
            <CustomButton
              disabled
              bg={BLUE_LIGHT}
              size={changeSize ? 48 : 56}
              type="square"
              onClick={() => null}
              extStyle={classes.animateIcons}>
              <NotifyIcon />
            </CustomButton>
          </Box>
          <Box
            ml={changeSize ? 1 : 2}>
            <CustomButton
              disabled
              bg={BLUE_LIGHT}
              size={changeSize ? 48 : 56}
              type="square"
              onClick={() => null}
              extStyle={classes.animateIcons}>
              <MessageIcon />
            </CustomButton>
          </Box>
          <Box
            ml={changeSize ? 1 : 2}>
            <DropdownMenu
              active={`/settings/${match?.params?.farmId}`}
              onSelect={onSelectSetting}
              list={settingsLinks(profile?.role)}>
              <CustomButton
                bg={match?.params?.type === "settings" ? ORANGE : BLUE_LIGHT}
                size={changeSize ? 48 : 56}
                type="square"
                extStyle={classes.animateIcons}>
                <SettingsIcon color={match?.params?.type === "settings" ? theme.palette.common.white : undefined} />
              </CustomButton>
            </DropdownMenu>
          </Box>
          <Hidden only={["xs", "sm"]}>
            <Box
              mr={1}
              ml={5}>
              <UserProfile />
            </Box>
          </Hidden>
          {!desktop && (
            <Box ml={changeSize ? 1 : 2}>
              <CustomButton
                bg={BLUE_LIGHT}
                type="square"
                size={changeSize ? 48 : 56}
                onClick={openAside}>
                <MenuIcon color="secondary" />
              </CustomButton>
            </Box>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  desktop: PropTypes.bool.isRequired,
  openAside: PropTypes.func.isRequired,
};

export default memo(Header);
