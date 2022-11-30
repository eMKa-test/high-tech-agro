import {memo, useCallback, useState} from "react";
import * as PropTypes from "prop-types";
import {
  Box, InputAdornment, makeStyles, OutlinedInput, useTheme,
} from "@material-ui/core";
import {useSnackbar} from "notistack";
import Text from "../../inputs/Text";
import styles from "./styles";
import CowIcon from "../../icons/cow";
import CustomButton from "../../inputs/CustomButton";
import RoundLoader from "../../Loaders/RoundLoader";
import AddRoundIcon from "../../icons/add_round";
import {ERRORS} from "../../../common/vars";
import {postData} from "../../../common/api/request";
import IllIcon from "../../icons/ill";

const useStyles = makeStyles(styles);

function AddIll({updateIlls, onClose}) {
  const classes = useStyles();
  const {enqueueSnackbar: openPar} = useSnackbar();
  const {props: colorTheme} = useTheme();

  const [ill, setIll] = useState("");
  const [load, setLoad] = useState(false);

  const onChange = useCallback(({target: {value}}) => {
    setIll(value);
  }, []);

  const onSubmit = useCallback(async () => {
    if (!ill) {
      openPar("Отсутствует наименование болезни", {variant: "error"});
      return null;
    }
    setLoad(true);
    try {
      const res = await postData("/ills", {body: {title: ill}});
      if (res?.payload) {
        openPar("Болезнь добавлена", {variant: "success"});
        setTimeout(() => {
          setLoad(false);
          updateIlls();
          onClose();
        }, 300);
      } else {
        openPar(ERRORS.UNKNOWN, {variant: "error"});
        setLoad(false);
      }
    } catch (err) {
      console.log(err);
      openPar(ERRORS.UNKNOWN, {variant: "error"});
      setLoad(false);
    }
    return null;
  }, [ill]);

  return (
    <div className={classes.rootAddIll}>
      <Box mb={4}>
        <Text
          align="center"
          size={20}
          weight={700}>
          Карточка добавления болезни
        </Text>
      </Box>
      <Box mb={4}>
        <OutlinedInput
          type="text"
          className={classes.textFieldRoot}
          onChange={onChange}
          placeholder="Наименование болезни"
          startAdornment={(
            <InputAdornment position="start">
              <IllIcon />
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
          Добавить болезнь
        </Text>
      </CustomButton>
    </div>
  );
}

AddIll.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateIlls: PropTypes.func.isRequired,
};

export default memo(AddIll);
