import {memo, useCallback, useContext} from "react";
import {
  Card, CardContent, Avatar, IconButton,
} from "@material-ui/core";
import get from "lodash/get";
import {makeStyles, useTheme} from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import styles from "./styles";
import DropDown from "../dropdownMenu";
import Text from "../inputs/Text";
import {ProfileContext} from "../../providers/Profile";
import {ROLES} from "../../common/vars";

const avatarDefault = "/assets/avatar_default.svg";
const useStyles = makeStyles(styles);

function UserProfile() {
  const {palette} = useTheme();
  const classes = useStyles();
  const {profile} = useContext(ProfileContext);
  const email = get(profile, "email", "");
  const role = get(profile, "role", "");

  const logOut = useCallback(() => {
    axios.get("/logout").then(() => {
      window.location.href = "/";
    }).catch(console.error);
  }, []);

  return (
    <Card
      elevation={0}
      className={classes.rootUserProfile}>
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          src={avatarDefault} />
        <div className={classes.info}>
          <Text
            noWrap
            lineHeight={1.5}
            size={16}
            weight={500}
            color={palette.text.primary}>
            {email}
          </Text>
          <Text
            noWrap
            lineHeight={1.5}
            size={12}
            weight={300}
            color={palette.text.primary}>
            {ROLES[role]}
          </Text>
        </div>
        <DropDown
          bottomHandler={logOut}
          bottomChildren="Выйти">
          <IconButton>
            <ExpandMoreIcon className={classes.menuButton} />
          </IconButton>
        </DropDown>
      </CardContent>
    </Card>
  );
}

export default memo(UserProfile);
