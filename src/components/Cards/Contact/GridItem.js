import {
  memo, Fragment, useCallback, useContext, useReducer, useEffect,
} from "react";
import * as PropTypes from "prop-types";
import {Box} from "@material-ui/core";
import {useTheme, makeStyles} from "@material-ui/styles";
import {useSnackbar} from "notistack";
import Card from "./Card";
import Modal from "../../modals/modal";
import FirstStep from "../../steppers/contact/steps/FirstStep";
import CustomButton from "../../inputs/CustomButton";
import RoundLoader from "../../Loaders/RoundLoader";
import Text from "../../inputs/Text";
import styles from "./styles";
import {postData, deleteData} from "../../../common/api/request";
import {ERRORS, NO_VALUE} from "../../../common/vars";
import ConfirmModal from "../../modals/ConfirmModal";
import EditContactFarm from "./EditContactFarm";
import {FarmsContext} from "../../../providers/Farms";
import {
  initialState,
  reducer,
  actionLoad,
  actionSetCard,
  actionSetMode,
  actionInit,
  actionSetOpen,
  actionSetSelected,
  actionSetDisable,
} from "./reducer";

const useStyles = makeStyles(styles);

const options = [
  {
    label: "Редактировать",
    value: "edit",
  },
  {
    label: "Удалить",
    value: "delete",
  },
  {
    label: "Назначить",
    value: "update",
  },
];

function GridItem({contacts, updateContacts}) {
  const classes = useStyles();
  const {props: colorTheme} = useTheme();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const {farms} = useContext(FarmsContext);
  const [{
    load, mode, card, properties, selected, open, disableSelect,
  }, dispatch] = useReducer(reducer, initialState(), initialState);

  useEffect(() => {
    dispatch(actionInit(farms));
  }, [farms]);

  const closeMode = useCallback(() => {
    if (mode === "delete") {
      dispatch(actionSetMode(""));
    } else {
      dispatch(actionSetOpen(false));
    }
    setTimeout(() => {
      if (mode !== "delete") {
        dispatch(actionSetMode(""));
      }
      dispatch(actionSetCard(null));
    }, 300);
  }, [mode]);

  const onSelectOption = useCallback(({action, user}) => {
    dispatch(actionSetCard(user, action));
    if (action !== "delete") {
      dispatch(actionSetOpen(true));
    }
  }, [mode]);

  const onChange = useCallback((name, value) => {
    const result = {...card, [name]: value};
    dispatch(actionSetCard(result));
  }, [card]);

  const onSubmit = useCallback(async () => {
    try {
      dispatch(actionLoad(true));
      const url = `/contacts/${card.uuid}`;
      if (mode === "delete") {
        const response = await deleteData(url);
        if (response?.payload) {
          dispatch(actionLoad(false));
          closeMode();
          updateContacts();
        }
      } else {
        const {name, tel, email} = card;
        let body = {};
        if (mode === "edit") {
          body = {name, tel, email};
        } else {
          body = {...card};
        }
        const response = await postData(url, {body});
        if (response?.payload) {
          const message = mode === "delete" ? "Контакт удалён" : "Контакт успешно обновлен";
          setTimeout(() => {
            dispatch(actionLoad(false));
            closeMode();
            openBar(message, {variant: "success"});
            if (mode === "edit") {
              updateContacts();
            }
          }, 400);
        } else {
          dispatch(actionLoad(false));
          openBar(ERRORS.UNKNOWN, {variant: "error"});
        }
      }
    } catch (err) {
      console.error(err);
      openBar(err?.message || ERRORS.UNKNOWN, {variant: "error"});
      dispatch(actionLoad(false));
    }
    return null;
  }, [card, mode]);

  const onSelect = useCallback((_, item, isRemove) => {
    if (!item) {
      return null;
    }
    const url = `/contacts/${card.uuid}`;
    const body = {
      id: item.value,
    };
    const match = selected.find((el) => el.value === item.value);
    if (match && isRemove === "select-option") {
      return null;
    }
    if (match) {
      body.unbind = item.type;
    } else {
      body.bind = item.type;
    }
    dispatch(actionSetDisable(true));
    if (body.id) {
      return postData(url, {body}).then((res) => {
        if (res?.payload) {
          updateContacts();
          return dispatch(actionSetSelected(item, isRemove));
        }
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }).catch((err) => {
        console.log(err);
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }).finally(() => {
        dispatch(actionSetDisable(true));
      });
    }
    dispatch(actionSetDisable(true));
    return openBar(ERRORS.UNKNOWN, {variant: "error"});

  }, [card, selected]);

  if (contacts?.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {contacts.map((cont, i) => (
        <Card
          onSelectOption={onSelectOption}
          options={options}
          key={String(i)}
          item={cont} />
      ))}
      <Modal
        open={open}
        onClose={closeMode}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column">
          {mode === "edit" ? (
            <FirstStep
              title="Изменение контактной информации"
              card={card}
              active
              setParam={onChange} />
          ) : null}
          {mode === "update" ? (
            <EditContactFarm
              disableSelect={disableSelect}
              onSelect={onSelect}
              selected={selected}
              properties={properties} />
          ) : null}
          {mode === "edit" ? (
            <Box mt={4}>
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
                <Text
                  noWrap
                  variant="body1">
                  Сохранить изменения
                </Text>
              </CustomButton>
            </Box>
          ) : null }
        </Box>
      </Modal>
      <ConfirmModal
        deps={mode}
        onConfirm={onSubmit}
        title={`Вы действительно хотите удалить контакт ${card?.name || NO_VALUE}?`}
        open={mode === "delete"}
        onClose={closeMode} />
    </Fragment>
  );
}

GridItem.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  updateContacts: PropTypes.func.isRequired,
};

export default memo(GridItem);
