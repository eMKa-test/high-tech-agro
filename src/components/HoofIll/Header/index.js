import {memo} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import get from "lodash/get";
import styles from "../styles";
import Text from "../../inputs/Text";
import CalendarIcon from "../../icons/calendar";
import {formDate, formAuditNumber, screenMediaRule} from "../../../common/utils";
import LoginField from "../../icons/loginField";
import InspectionIcon from "../../icons/inspection";
import {ERRORS} from "../../../common/vars";
import ActionsGroup from "./ActionsGroup";

const useStyles = makeStyles(styles);
const auditTypes = {
  hoofs: "Осмотр копыт",
  base: "Простой осмотр",
};

function Header(props) {
  const {cow, audit} = props;
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const beforeTablet = screenMediaRule(415);
  const tablet = screenMediaRule(768, "min-width");

  const auditNumber = formAuditNumber(audit?.number) || ERRORS.UNKNOWN;
  const cowNumber = get(cow, "number", ERRORS.UNKNOWN);
  const date = formDate(audit?.date) || ERRORS.UNKNOWN;
  const managerName = get(audit, "manager.name", ERRORS.UNKNOWN);
  const auditType = auditTypes[audit?.type] || ERRORS.UNKNOWN;

  return (
    <Box className={classes.header}>
      <div className={classes.headerWrapper}>
        {cow ? (
          <Box
            mb={beforeTablet ? 2 : 0}
            flexDirection={beforeTablet ? "column" : "row"}
            display="flex">
            <Text
              noWrap
              margin="0 10px 0 0"
              color={colorTheme.BLUE.main}
              size="1.5rem"
              weight={700}>
              Корова #
              {cowNumber}
            </Text>
            <Text
              noWrap
              color={colorTheme.BLUE.main}
              size="1.5rem"
              weight={700}>
              (Осмотр #
              {auditNumber}
              )
            </Text>
          </Box>
        ) : (
          <Text
            noWrap
            color={colorTheme.BLUE.main}
            size="1.5rem"
            weight={700}>
            Осмотр #
            {auditNumber}
          </Text>
        )}
        <ActionsGroup
          cowNumber={cowNumber}
          cowUuid={cow?.uuid}
          auditUuid={audit?.uuid} />
      </div>
      <Box
        mt={tablet ? 1 : 0}
        className={classes.auditInfo}>
        <Box
          mb={beforeTablet ? 1 : 0}
          mr={3}
          className={classes.auditDate}>
          <Box
            width={20}
            mr={1.5}>
            <CalendarIcon />
          </Box>
          <Text
            noWrap
            color={colorTheme.BLUE.main}
            size={16}
            weight={400}>
            {date}
          </Text>
        </Box>
        <Box
          mb={beforeTablet ? 1 : 0}
          mr={3}
          className={classes.auditUser}>
          <Box
            align="center"
            width={20}
            mr={1.5}>
            <LoginField />
          </Box>
          <Text
            noWrap
            color={colorTheme.BLUE.main}
            size={16}
            weight={400}>
            {managerName}
          </Text>
        </Box>
        <Box
          mb={beforeTablet ? 1 : 0}
          className={classes.auditType}>
          <Box
            width={20}
            mr={1.5}>
            <InspectionIcon />
          </Box>
          <Text
            noWrap
            color={colorTheme.BLUE.main}
            size={16}
            weight={400}>
            {auditType}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

Header.propTypes = {
  cow: PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number: PropTypes.string,
    auditId: PropTypes.string,
  }),
  audit: PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    type: PropTypes.string,
    audit: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    manager: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default memo(Header);
