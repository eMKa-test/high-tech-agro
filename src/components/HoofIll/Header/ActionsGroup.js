import {
  memo, Fragment, useCallback, useState,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import styles from "../styles";
import CustomButton from "../../inputs/CustomButton";
import SubmitAuditIcon from "../../icons/submit audit";
import AddRoundIcon from "../../icons/add_round";
import RemoveIcon from "../../icons/remove";
import {deleteData} from "../../../common/api/request";
import eventEmitter from "../../../common/utils/emitter";
import {ERRORS} from "../../../common/vars";
import Modal from "../../modals/modal";
import AddCow from "../../Cards/AddCow";
import ConfirmModal from "../../modals/ConfirmModal";
import AuditSubmit from "../../Cards/AuditSubmit";

const useStyles = makeStyles(styles);

function ActionsGroup(props) {
  const {cowUuid, auditUuid, cowNumber} = props;
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [auditTotal, setAuditTotal] = useState(false);

  const openAddCow = useCallback(() => setOpen(true), []);
  const closeAddCow = useCallback(() => setOpen(false), []);

  const openRemoveCow = useCallback(() => setConfirm(true), []);
  const closeRemoveCow = useCallback(() => setConfirm(false), []);

  const openAuditTotal = useCallback(() => setAuditTotal(true), []);
  const closeAuditTotal = useCallback(() => setAuditTotal(false), []);

  const onConfirm = useCallback(async () => {
    try {
      const url = `/cows/${cowUuid}`;
      const response = await deleteData(url);
      if (response?.payload) {
        openBar("Корова успешно удалена", {variant: "success"});
        setTimeout(() => {
          eventEmitter.emit("updateCowList");
          const redirect = `/audit/card/${auditUuid}`;
          history.replace(redirect);
        }, 400);
      } else {
        openBar(ERRORS.UNKNOWN, {variant: "error"});
      }
    } catch (err) {
      console.error(err);
      openBar(err.message || ERRORS.UNKNOWN, {variant: "error"});
    }
    return null;
  }, [cowUuid, auditUuid]);

  return (
    <Fragment>
      <Box className={classes.auditActionGroup}>
        <CustomButton
          extStyle={classes.auditActionSubmit}
          title="Завершить осмотр"
          size={48}
          bg={colorTheme.BLUE}
          onClick={openAuditTotal}>
          <Box
            display="flex"
            alignItems="center">
            <SubmitAuditIcon />
          </Box>
        </CustomButton>
        <CustomButton
          extStyle={classes.auditActionAddCow}
          title="Добавить корову"
          size={48}
          bg={colorTheme.ORANGE}
          onClick={openAddCow}>
          <Box
            display="flex"
            alignItems="center">
            <AddRoundIcon />
          </Box>
        </CustomButton>
        {cowUuid ? (
          <CustomButton
            extStyle={classes.auditActionRemoveCow}
            title="Удалить корову"
            size={48}
            bg={colorTheme.RED}
            onClick={openRemoveCow}>
            <Box
              display="flex"
              alignItems="center">
              <RemoveIcon />
            </Box>
          </CustomButton>
        ) : null}
      </Box>
      <Modal
        open={auditTotal}
        onClose={closeAuditTotal}>
        <AuditSubmit
          onClose={closeAuditTotal}
          auditUuid={auditUuid} />
      </Modal>
      <Modal
        open={open}
        onClose={closeAddCow}>
        <AddCow onClose={closeAddCow} />
      </Modal>
      <ConfirmModal
        deps={[auditUuid, cowUuid]}
        onConfirm={onConfirm}
        open={confirm}
        onClose={closeRemoveCow}
        title={`Вы действительно хотите удалить корову №${cowNumber}?`} />
    </Fragment>
  );
}

ActionsGroup.propTypes = {
  auditUuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cowUuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cowNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(ActionsGroup);
