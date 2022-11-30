import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {
  Avatar, Box, IconButton, Paper,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import Text from "../../inputs/Text";
import EditIcon from "../../icons/edit";
import PhoneContactIcon from "../../icons/phone_contact";
import MailContactIcon from "../../icons/mail_contact";
import styles from "./styles";
import DropDown from "../../dropdownMenu";
import {NO_VALUE, ROLES} from "../../../common/vars";

const useStyles = makeStyles(styles);

function Card({item, options, onSelectOption}) {
  const classes = useStyles();

  const contactTel = item?.tel || NO_VALUE;
  const contactMail = item?.email || NO_VALUE;
  const role = ROLES[item?.role] || "Контактное лицо";

  const onSelect = useCallback((user) => (value) => {
    if (typeof onSelectOption === "function") {
      onSelectOption({action: value, user});
    }
  }, [onSelectOption]);

  return (
    <Paper
      elevation={0}
      className={classes.card}>
      <Box className={classes.cardHeader}>
        <Box className={classes.cardHeaderLeft}>
          <Avatar
            className={classes.cardAvatar}
            variant="square" />
          <Box className={classes.cardContactData}>
            <Text
              gutterBottom
              lineHeight="20px"
              weight={500}
              size={14}>
              {item.name}
            </Text>
            <Text
              noWrap
              size={12}
              lineHeight="24px"
              weight={300}>
              {role}
            </Text>
          </Box>
        </Box>
        <DropDown
          onSelect={onSelect(item)}
          list={options}>
          <IconButton
            disableRipple
            className={classes.cardEditContact}>
            <EditIcon />
          </IconButton>
        </DropDown>
      </Box>
      <Box>
        {item.tel && (
          <Box className={classes.cardFooterPhone}>
            <Box
              mr={2}
              display="flex"
              alignItems="center">
              <PhoneContactIcon />
            </Box>
            <a
              className={classnames({
                [classes.link]: contactTel !== NO_VALUE,
                [classes.noLink]: contactTel === NO_VALUE,
              })}
              href={contactTel === NO_VALUE ? null : `tel:${contactTel}`}>
              <Text
                className={classnames({
                  [classes.link]: contactTel !== NO_VALUE,
                  [classes.noLink]: contactTel === NO_VALUE,
                })}
                weight={500}
                noWrap
                color="inherit"
                size={14}>
                {contactTel}
              </Text>
            </a>
          </Box>
        )}
        {item.email && (
          <Box className={classes.cardFooterMail}>
            <Box
              mr={2}
              display="flex"
              alignItems="center">
              <MailContactIcon />
            </Box>
            <a
              className={classnames({
                [classes.link]: contactMail !== NO_VALUE,
                [classes.noLink]: contactMail === NO_VALUE,
              })}
              href={contactMail === NO_VALUE ? null : `mailto:${contactMail}`}>
              <Text
                weight={500}
                noWrap
                color="inherit"
                size={14}>
                {contactMail}
              </Text>
            </a>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    tel: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  })),
  onSelectOption: PropTypes.func,
};

export default memo(Card);
