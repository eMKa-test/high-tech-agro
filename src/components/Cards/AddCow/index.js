import {
  memo, useCallback, useContext, useState,
} from "react";
import * as PropTypes from "prop-types";
import {
  Box, InputAdornment, makeStyles, OutlinedInput, useTheme,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useRouteMatch} from "react-router";
import Text from "../../inputs/Text";
import styles from "./styles";
import CowIcon from "../../icons/cow";
import CustomButton from "../../inputs/CustomButton";
import RoundLoader from "../../Loaders/RoundLoader";
import AddRoundIcon from "../../icons/add_round";
import {ERRORS} from "../../../common/vars";
import {postData} from "../../../common/api/request";
import {CowsContext} from "../../../providers/Cows";

const useStyles = makeStyles(styles);

function AddCow({onClose}) {
  const classes = useStyles();
  const match = useRouteMatch("/audit/card/:auditId");
  const {push: redirect} = useHistory();
  const {enqueueSnackbar: openPar} = useSnackbar();
  const {props: colorTheme} = useTheme();
  const {getCows} = useContext(CowsContext);

  const [card, setCard] = useState({auditId: match?.params?.auditId});
  const [load, setLoad] = useState(false);

  const onChange = useCallback(({target: {value}}) => {
    setCard({
      ...card,
      number: value,
    });
  }, [card]);

  const onSubmit = useCallback(async () => {
    if (!card.number) {
      openPar("Номер животного не заполнен", {variant: "error"});
      return null;
    }
    setLoad(true);
    try {
      const auditId = match?.params?.auditId;
      const res = await postData("/cows", {body: card});
      if (res?.payload) {
        openPar("Корова добавлена", {variant: "success"});
        setTimeout(() => {
          setLoad(false);
          const url = `/audit/card/${auditId}/cow/${res.payload.uuid}`;
          getCows(auditId, () => {
            redirect(url);
          });
          onClose();
        }, 800);
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
  }, [card, match?.params?.auditId]);

  return (
    <div className={classes.rootAddCow}>
      <Box mb={1}>
        <Text
          align="center"
          noWrap
          size={20}
          weight={700}>
          Карточка коровы
        </Text>
      </Box>
      <Box mb={3}>
        <Text
          align="center"
          noWrap
          size={14}
          weight={300}>
          Укажите необходимые данные
        </Text>
        <Text
          align="center"
          size={14}
          weight={300}>
          необходимые поля помечены*
        </Text>
      </Box>
      <Box mb={4}>
        <OutlinedInput
          type="text"
          className={classes.textFieldRoot}
          onChange={onChange}
          placeholder="№ Животного"
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
          Добавить корову
        </Text>
      </CustomButton>
    </div>
  );
}

AddCow.propTypes = {
  onClose: PropTypes.func,
};

export default memo(AddCow);
