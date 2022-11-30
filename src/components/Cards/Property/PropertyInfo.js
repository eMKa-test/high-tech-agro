import {memo} from "react";
import * as PropTypes from "prop-types";
import {Box} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import get from "lodash/get";
import Text from "../../inputs/Text";
import styles from "./styles";
import {NO_VALUE} from "../../../common/vars";
import CowIcon from "../../icons/cow";
import KeepIcon from "../../icons/keep";
import WavesIcon from "../../icons/waves";
import {screenMediaRule} from "../../../common/utils";

const useStyles = makeStyles(styles);

const tanksTypes = {
  true: "Да",
  false: "Нет",
};

const keepTypes = {
  connected: "Привязное",
  unconnected: "Беспривязное",
};

function PropertyInfo({info}) {
  const classes = useStyles();
  const mediaRule = screenMediaRule(1510, "min-width");
  const {palette: {text}} = useTheme();

  const propertyHeads = get(info, "heads", NO_VALUE);
  const propertyTanks = tanksTypes[info?.tanks] || NO_VALUE;
  const propertyKeepType = keepTypes[info?.keepingType] || NO_VALUE;

  return (
    <Box mt={3}>
      <Box
        justify="space-between"
        className={classes.propertyInfoRow}>
        <Box
          flexGrow={1}
          className={classes.propertyInfoTitle}>
          <Box
            title="Количество голов"
            display="flex"
            alignItems="center"
            width={35}>
            <CowIcon />
          </Box>
          <Text
            weight={300}
            size={14}
            color={text.primary}>
            Голов
          </Text>
        </Box>
        <Text
          weight={300}
          size={14}
          color={text.primary}>
          {propertyHeads}
        </Text>
      </Box>
      <Box
        justify="space-between"
        className={classes.propertyInfoRow}>
        <Box
          flexGrow={1}
          className={classes.propertyInfoTitle}>
          <Box
            title="Содержание"
            display="flex"
            alignItems="center"
            width={35}>
            <KeepIcon />
          </Box>
          <Text
            weight={300}
            size={14}
            color={text.primary}>
            Содержание
          </Text>
        </Box>
        <Text
          weight={300}
          size={14}
          color={text.primary}>
          {propertyKeepType}
        </Text>
      </Box>
      <Box
        justify="space-between"
        className={classes.propertyInfoRow}>
        <Box
          flexGrow={1}
          className={classes.propertyInfoTitle}>
          <Box
            title="Ванны"
            display="flex"
            alignItems="center"
            width={35}>
            <WavesIcon />
          </Box>
          <Text
            weight={300}
            size={14}
            color={text.primary}>
            Ванны
          </Text>
        </Box>
        <Text
          weight={300}
          size={14}
          color={text.primary}>
          {propertyTanks}
        </Text>
      </Box>
    </Box>
  );
}

PropertyInfo.propTypes = {
  info: PropTypes.shape({
    tanks: PropTypes.bool,
    keepingType: PropTypes.string,
  }),
};

export default memo(PropertyInfo);
