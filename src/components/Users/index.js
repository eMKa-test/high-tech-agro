import {
  memo, Fragment, useCallback, useState,
} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import {useSnackbar} from "notistack";
import styles from "./styles";
import ContactCard from "../Cards/Contact/Card";
import Modal from "../modals/modal";
import Edit from "./EditUser";
import ConfirmModal from "../modals/ConfirmModal";
import AddUser from "./AddUser";
import AutocompleteFarms from "../AutocompleteFarms";
import {deleteData} from "../../common/api/request";
import {ERRORS} from "../../common/vars";

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
    value: "bind",
  },
];

function Users(props) {
  const {list, updateUsers} = props;
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState(null);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setMode("");
      setUser(null);
    }, 250);
  }, [user]);

  const openConfirm = useCallback(() => setConfirm(true), []);
  const closeConfirm = useCallback(() => {
    setConfirm(false);
    setTimeout(() => {
      setUser(null);
    }, 250);
  }, []);

  const onSelect = useCallback(({action, user: item}) => {
    setUser(item);
    if (action !== "delete") {
      setMode(action);
      return openModal();
    }
    return openConfirm();
  }, [user]);

  const onConfirmDelete = useCallback(async () => {
    try {
      const url = `/users/${user.uuid}`;
      const response = await deleteData(url);
      if (response?.payload) {
        openBar("Пользователь успешно удален", {variant: "success"});
        updateUsers();
      } else {
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      console.error(err);
      openBar(err.message || ERRORS.UNKNOWN, {variant: "error"});
    }
  }, [user]);

  const confirmTitle = `Вы действительно хотите удалить пользователя ${user?.name}?`;

  return (
    <Fragment>
      <AddUser updateUsers={updateUsers} />
      <Box className={classes.rootUsers}>
        {list.map((item) => (
          <ContactCard
            onSelectOption={onSelect}
            options={options}
            key={item.uuid}
            item={item} />
        ))}
        <Modal
          onClose={closeModal}
          open={open}>
          {mode === "edit" ? (
            <Edit
              updateUsers={updateUsers}
              uuid={user?.uuid}
              userName={user?.name}
              onClose={closeModal} />
          ) : null}
          {mode === "bind" ? (
            <AutocompleteFarms
              updateUsers={updateUsers}
              user={user} />
          ) : null}
        </Modal>
        <ConfirmModal
          deps={user}
          title={confirmTitle}
          onConfirm={onConfirmDelete}
          open={confirm}
          onClose={closeConfirm} />
      </Box>
    </Fragment>
  );
}

Users.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    mail: PropTypes.string,
  })),
  updateUsers: PropTypes.func.isRequired,
};

export default memo(Users);
