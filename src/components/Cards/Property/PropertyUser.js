import {memo} from "react";
import * as PropTypes from "prop-types";
import classnames from "classnames";
import {Avatar, Box} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import Text from "../../inputs/Text";
import PhoneContactIcon from "../../icons/phone_contact";
import MailContactIcon from "../../icons/mail_contact";
import {NO_VALUE} from "../../../common/vars";
import styles from "./styles";

const useStyles = makeStyles(styles);

function PropertyUser({info}) {
  const classes = useStyles();
  const {palette: {text}} = useTheme();

  const propertyUserName = info?.contact?.name || NO_VALUE;
  const propertyContactTel = info?.contact?.tel || NO_VALUE;
  const propertyContactMail = info?.contact?.email || NO_VALUE;

  return (
    <Box
      mt={2}>
      <Box className={classes.propertyUser}>
        <Avatar
          className={classes.propertyUserAvatar}
          variant="square" />
        <Box className={classes.propertyUserInfo}>
          <Text
            margin="0 0 10px 0"
            color={text.primary}
            size={14}
            weight={500}>
            {propertyUserName}
          </Text>
          <Text
            color="#727272"
            weight={300}
            noWrap
            size={12}>
            Контактное лицо
          </Text>
        </Box>
      </Box>
      <Box className={classes.propertyContact}>
        <Box className={classes.propertyContactRow}>
          <Box mr={1.5}>
            <PhoneContactIcon />
          </Box>
          <a
            className={classnames({
              [classes.link]: propertyContactTel !== NO_VALUE,
              [classes.noLink]: propertyContactTel === NO_VALUE,
            })}
            href={propertyContactTel === NO_VALUE ? null : `tel:${propertyContactTel}`}>
            <Text
              className={classnames({
                [classes.link]: propertyContactTel !== NO_VALUE,
                [classes.noLink]: propertyContactTel === NO_VALUE,
              })}
              weight={500}
              noWrap
              color="inherit"
              size={14}>
              {propertyContactTel}
            </Text>
          </a>
        </Box>
        <Box
          mt={1}
          className={classes.propertyContactRow}>
          <Box mr={1.5}>
            <MailContactIcon />
          </Box>
          <a
            className={classnames({
              [classes.link]: propertyContactMail !== NO_VALUE,
              [classes.noLink]: propertyContactMail === NO_VALUE,
            })}
            href={propertyContactMail === NO_VALUE ? null : `mailto:${propertyContactMail}`}>
            <Text
              weight={500}
              noWrap
              color="inherit"
              size={14}>
              {propertyContactMail}
            </Text>
          </a>
        </Box>
      </Box>
      <Box className={classes.propertyGeo} />
    </Box>
  );
}

PropertyUser.propTypes = {
  info: PropTypes.shape({
    contact: PropTypes.shape({
      name: PropTypes.string,
      tel: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default memo(PropertyUser);
