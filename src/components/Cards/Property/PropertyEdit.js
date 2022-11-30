import {
  memo, useCallback, useEffect, useState, Fragment,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box, InputAdornment, OutlinedInput} from "@material-ui/core";
import {useSnackbar} from "notistack";
import styles from "./styles";
import {postData} from "../../../common/api/request";
import Modal from "../../modals/modal";
import Text from "../../inputs/Text";
import CustomButton from "../../inputs/CustomButton";
import RoundLoader from "../../Loaders/RoundLoader";
import CowIcon from "../../icons/cow";
import TextFieldDropdown from "../../inputs/TextFieldDropdown";
import KeepIcon from "../../icons/keep";
import WavesIcon from "../../icons/waves";
import {ERRORS} from "../../../common/vars";

const useStyles = makeStyles(styles);

const keepingTypeOptions = [
  {
    label: "Привязное",
    value: "connected",
  },
  {
    label: "Беспривязное",
    value: "unconnected",
  },
];
const tanksOptions = [
  {
    label: "Нет",
    value: 0,
  },
  {
    label: "Да",
    value: 1,
  },
];

function PropertyEdit(props) {
  const {
    dismiss, info, open, property, updateFarms, updateInfo,
  } = props;
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const [load, setLoad] = useState(false);
  const [card, setCard] = useState(null);
  const {enqueueSnackbar: openBar} = useSnackbar();

  useEffect(() => {
    if (property && info?.type) {
      const result = {
        address: property?.address?.text || "",
        title: property?.title,
      };
      if (info.type === "Barn") {
        Object.assign(result, {
          heads: info?.heads,
          keepingType: info?.keepingType,
          tanks: info?.tanks,
        });
      }
      setCard(result);
    }
  }, [property, info]);

  const onChange = useCallback((name) => (ev, target) => {
    let value = ev?.target?.value;
    if (target) {
      value = target;
    }
    if (name === "tanks") {
      value = Boolean(target);
    }
    const result = {...card, [name]: value};
    setCard(result);
  }, [card]);

  const onSubmit = useCallback(async () => {
    try {
      setLoad(true);
      const url = `/farms/${property.uuid}`;
      const body = {
        ...card,
        model: info.type,
      };
      const response = await postData(url, {body});
      if (response?.payload) {
        updateInfo();
        updateFarms();
        dismiss();
        openBar("Информация обновлена", {variant: "success"});
      }
      setLoad(false);
    } catch (err) {
      console.error(err);
      setLoad(false);
      openBar(err?.message || ERRORS.UNKNOWN, {variant: "error"});
    }
    return null;
  }, [property, info, card]);

  return (
    <Modal
      open={open}
      onClose={dismiss}>
      <div className={classes.rootEditProperty}>
        <Box mb={3}>
          <Text
            align="center"
            size={20}
            weight={700}>
            Изменение хозяйства
          </Text>
        </Box>
        <div>
          <Box mb={2}>
            <OutlinedInput
              type="text"
              placeholder="Наименование"
              className={classes.textFieldRootAddress}
              onChange={onChange("title")}
              defaultValue={card?.title} />
          </Box>
          <Box>
            <OutlinedInput
              type="text"
              placeholder="Адрес"
              className={classes.textFieldRootAddress}
              onChange={onChange("address")}
              defaultValue={card?.address} />
          </Box>
        </div>
        {info?.type === "Barn" ? (
          <Fragment>
            <Box mt={2}>
              <OutlinedInput
                type="number"
                defaultValue={card?.heads || 0}
                className={classes.textFieldRoot}
                placeholder="Количество голов"
                onChange={onChange("heads")}
                inputProps={{
                  min: 0,
                }}
                startAdornment={(
                  <InputAdornment position="start">
                    <CowIcon />
                  </InputAdornment>
                )} />
            </Box>
            <Box mt={2}>
              <TextFieldDropdown
                initialValue={card?.keepingType || -1}
                options={keepingTypeOptions}
                fieldName="keepingType"
                placeholder="Тип содержания"
                onChange={onChange("keepingType")}
                Icon={KeepIcon} />
            </Box>
            <Box mt={2}>
              <TextFieldDropdown
                initialValue={Number(card?.tanks) || -1}
                options={tanksOptions}
                fieldName="tanks"
                placeholder="Ванны"
                onChange={onChange("tanks")}
                Icon={WavesIcon} />
            </Box>
          </Fragment>
        ) : null}
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
          <Text variant="body1">
            Изменить
          </Text>
        </CustomButton>
      </div>
    </Modal>
  );
}

PropertyEdit.propTypes = {
  info: PropTypes.shape({
    type: PropTypes.string,
    heads: PropTypes.number,
    keepingType: PropTypes.string,
    tanks: PropTypes.bool,
  }),
  property: PropTypes.shape({
    address: PropTypes.shape({
      text: PropTypes.string,
    }),
    title: PropTypes.string,
    uuid: PropTypes.string,
  }),
  updateFarms: PropTypes.func.isRequired,
  updateInfo: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default memo(PropertyEdit);
