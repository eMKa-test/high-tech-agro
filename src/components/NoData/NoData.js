import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, Paper} from "@material-ui/core";
import styles from "./styles";
import CustomButton from "../inputs/CustomButton";
import NoDataMainIcon from "../icons/noDataMain";
import Text from "../inputs/Text";
import NoDataSearchIcon from "../icons/noDataSearch";
import eventEmitter from "../../common/utils/emitter";

const useStyles = makeStyles(styles);

const types = {
  contact: {
    icon: <NoDataMainIcon />,
    buttonName: "Добавить контакт",
    headerText: "НЕТ ДАННЫХ",
    title: "Отсутствуют контактные данные хозяйства",
    emit: "addContact",
  },
  noCows: {
    icon: <NoDataMainIcon />,
    buttonName: "Добавить корову",
    headerText: "НЕТ ДАННЫХ",
    title: "В этом осмотре нет данных о животных",
    emit: "addCow",
  },
  toCow: {
    icon: <NoDataSearchIcon />,
    buttonName: "Перейти к корове",
    headerText: "ДОСТУПНЫ ОСМОТРЫ",
    title: "Нажмите, чтобы начать просмотр животного",
    emit: "toCow",
  },
};

function NoData(props) {
  const {type, onClick} = props;
  const {palette, props: colorTheme} = useTheme();
  const classes = useStyles();

  const _onClick = useCallback(() => {
    if (typeof onClick === "function") {
      return onClick();
    }
    return eventEmitter.emit(types[type].emit);
  }, [onClick, type]);

  return (
    <Box className={classes.noDataRoot}>
      <Paper
        elevation={0}
        className={classes.paperNoData}>
        {types[type].icon}
        <Box>
          <Text
            align="center"
            weight={700}
            size={14}>
            {types[type].headerText}
          </Text>
        </Box>
        <Box>
          <Text
            align="center"
            weight={400}
            size={12}>
            {types[type].title}
          </Text>
        </Box>
        <CustomButton
          onClick={_onClick}
          extStyle={classes.buttonStyle}
          bg={colorTheme.ORANGE}>
          <Text
            size={12}
            weight={900}
            noWrap
            color={palette.common.white}>
            {types[type].buttonName}
          </Text>
        </CustomButton>
      </Paper>
    </Box>
  );
}

NoData.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default memo(NoData);
