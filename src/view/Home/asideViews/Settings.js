import {memo, useCallback, useContext} from "react";
import {Box, makeStyles, useTheme} from "@material-ui/core";
import {useRouteMatch, useHistory} from "react-router-dom";
import * as PropTypes from "prop-types";
import Text from "../../../components/inputs/Text";
import CustomButton from "../../../components/inputs/CustomButton";
import styles from "../styles";
import {ProfileContext} from "../../../providers/Profile";

const useStyles = makeStyles(styles);

function Settings({closeDrawer}) {
  const match = useRouteMatch("/settings/:type");
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const {profile} = useContext(ProfileContext);

  const redirect = useCallback((url) => () => {
    closeDrawer();
    history.push(url);
  }, []);

  return (
    <Box>
      <CustomButton
        fullWidth
        onClick={redirect("/settings/ills")}
        extStyle={classes.asideActionButton}
        bg={match?.params?.type === "ills" ? colorTheme.ORANGE : colorTheme.BLUE}>
        <Text variant="body1">
          Настройки болезней
        </Text>
      </CustomButton>
      {profile && (profile.role === "admin" || profile.role === "ceo") ? (
        <Box mt={3}>
          <CustomButton
            onClick={redirect("/settings/users")}
            fullWidth
            extStyle={classes.asideActionButton}
            bg={match?.params?.type === "users" ? colorTheme.ORANGE : colorTheme.BLUE}>
            <Text variant="body1">
              Настройки пользователей
            </Text>
          </CustomButton>
        </Box>
      ) : null}
    </Box>
  );
}

Settings.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default memo(Settings);
