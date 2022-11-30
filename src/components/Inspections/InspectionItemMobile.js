import {
  memo, useEffect, useCallback, useState,
} from "react";
import moment from "moment";
import * as PropTypes from "prop-types";
import {Box, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import {makeStyles, useTheme} from "@material-ui/styles";
import get from "lodash/get";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import Text from "../inputs/Text";
import CowIcon from "../icons/cow";
import CalendarIcon from "../icons/calendar";
import LoginField from "../icons/loginField";
import {UNKNOWN} from "../../common/vars";
import {formAuditNumber} from "../../common/utils";
import {getCows} from "./helpers";

const useStyles = makeStyles(styles);

function InspectionItemMobile({item, index, children}) {
  const classes = useStyles();
  const {props: colorTheme} = useTheme();
  const auditNumber = formAuditNumber(item.number);
  const title = `Осмотр #${auditNumber}`;
  const managerName = get(item, "manager.name", UNKNOWN);
  const cowsCount = getCows(item?.cows?.length);
  const [percent, setPercent] = useState(0);
  const percentTitle = percent > 0 && percent < 100 ? percent.toFixed(2) : percent;

  let timer = null;

  const setPercents = useCallback(() => {
    const result = item?.percent || 0;
    timer = setTimeout(() => {
      setPercent(result);
    }, 200 + index);
  }, [item]);

  useEffect(() => {
    setPercents();
    return () => clearTimeout(timer);
  }, [item]);

  return (
    <Paper
      className={classes.itemContainerMobile}
      elevation={0}>
      <Box
        component={Link}
        className={classes.linkToAudit}
        to={`/audit/card/${item.uuid}`}>
        <div className={classes.topItem}>
          <Box>
            <Text
              size={18}
              weight={700}>
              {title}
            </Text>
          </Box>
          <Box className={classes.itemStyleMobile}>
            <LoginField />
            <Text
              margin="0 0 0 15px"
              weight={400}
              size={16}
              color={colorTheme.BLUE.main}>
              {managerName}
            </Text>
          </Box>
        </div>
      </Box>
      <Box
        component={Link}
        className={classes.linkToAudit}
        to={`/audit/card/${item.uuid}`}>
        <div className={classes.topItem}>
          <Box className={classes.cowsInfo}>
            <CowIcon />
            <Text
              margin="0 0 0 15px"
              size={14}
              weight={300}>
              {cowsCount}
            </Text>
          </Box>
          <Box
            className={classes.itemStyleMobile}>
            <CalendarIcon />
            <Text
              noWrap
              margin="0 0 0 15px"
              weight={400}
              size={16}
              color={colorTheme.BLUE.main}>
              {moment(item.date).format("YYYY-MM-DD")}
            </Text>
          </Box>
        </div>
      </Box>
      <div className={classes.topItem}>
        <Box
          component={Link}
          className={classes.linkToAudit}
          to={`/audit/card/${item.uuid}`}>
          <div className={classes.percentWrapper}>
            <CircularProgress
              size={65}
              thickness={5}
              className={classes.percentCow}
              variant="determinate"
              value={percent} />
            <CircularProgress
              variant="determinate"
              className={classes.top}
              classes={{
                circle: classes.circle,
              }}
              value={100}
              size={65}
              thickness={5} />
            <div className={classes.percentTitle}>
              <Text
                weight={700}
                color={colorTheme.BLUE.main}
                size={13}>
                {percentTitle}
                %
              </Text>
            </div>
          </div>
        </Box>
        {children}
      </div>
    </Paper>
  );
}

InspectionItemMobile.propTypes = {
  item: PropTypes.shape({
    number: PropTypes.number,
    percent: PropTypes.any,
    date: PropTypes.string,
    uuid: PropTypes.string,
    cows: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  index: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default memo(InspectionItemMobile);
