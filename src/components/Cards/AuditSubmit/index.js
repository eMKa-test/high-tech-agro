import {memo, useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, InputAdornment, OutlinedInput} from "@material-ui/core";
import {useSnackbar} from "notistack";
import styles from "./styles";
import Text from "../../inputs/Text";
import CustomButton from "../../inputs/CustomButton";
import RoundLoader from "../../Loaders/RoundLoader";
import AddRoundIcon from "../../icons/add_round";
import CowIcon from "../../icons/cow";
import {postData} from "../../../common/api/request";
import {ERRORS} from "../../../common/vars";

const useStyles = makeStyles(styles);

function AuditSubmit(props) {
  const {auditUuid, onClose} = props;
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const [load, setLoad] = useState(false);
  const [total, setTotal] = useState(0);

  const onChange = useCallback(({target: {value}}) => {
    setTotal(value);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      if (!total) {
        return openBar("Не указано количество коров", {variant: "error"});
      }
      if (Number(total) === 0) {
        return openBar("Коров не может быть 0", {variant: "error"});
      }
      setLoad(true);
      const url = `/audit/${auditUuid}`;
      const body = {total: Number(total)};
      const response = await postData(url, {body});
      if (response?.payload) {
        setTimeout(() => {
          openBar("Осмотр создан", {variant: "success"});
          setLoad(false);
          onClose();
        }, 400);
      } else {
        setLoad(false);
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      console.error(err);
      openBar(err.message || ERRORS.UNKNOWN, {variant: "error"});
      setLoad(false);
    }
    return null;
  }, [total, auditUuid]);

  return (
    <Box calssname={classes.rootAuditSubmit}>
      <Box mb={4}>
        <Text
          align="center"
          size={20}
          weight={700}>
          Карточка завершения осмотра
        </Text>
      </Box>
      <Box mb={4}>
        <OutlinedInput
          type="number"
          className={classes.textFieldRoot}
          onChange={onChange}
          placeholder="Количество коров"
          inputProps={{
            min: 0,
          }}
          startAdornment={(
            <InputAdornment position="start">
              <CowIcon />
            </InputAdornment>
          )} />
      </Box>
      <CustomButton
        fullWidth
        disabled={load}
        extStyle={classes.asideActionButton}
        bg={colorTheme.ORANGE}
        onClick={onSubmit}>
        {load ? (
          <Box className={classes.loaderContainer}>
            <RoundLoader />
          </Box>
        ) : null}
        <Box
          display="flex"
          alignItems="center"
          mr={1}>
          <AddRoundIcon />
        </Box>
        <Text variant="body1">
          Завершить осмотр
        </Text>
      </CustomButton>
    </Box>
  );
}

AuditSubmit.propTypes = {
  auditUuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(AuditSubmit);
