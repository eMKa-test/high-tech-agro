import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {
  Modal as ModalWin, Backdrop, Grow, Button, Box,
} from "@material-ui/core";
import Close from "@material-ui/icons/Clear";
import {modalStyles as styles} from "./styles";
import Text from "../inputs/Text";
import CustomButton from "../inputs/CustomButton";

const useStyles = makeStyles(styles);
const backDropTimeout = {timeout: 250};

function ConfirmModal(props) {
  const {
    deps = undefined,
    open, onClose = () => null, children,
    onConfirm = () => null,
    afterConfirmed = () => null,
    title = "",
  } = props;
  const {palette, props: colorTheme} = useTheme();
  const classes = useStyles();

  const dismiss = useCallback(() => {
    if (typeof onClose === "function") {
      onClose();
    }
  }, [deps]);

  const _onConfirm = useCallback(() => {
    if (typeof onConfirm === "function") {
      onConfirm();
      if (typeof afterConfirmed === "function") {
        afterConfirmed();
      }
      onClose();
    }
  }, [deps]);

  return (
    <ModalWin
      disableAutoFocus
      className={classes.confirmModal}
      open={open}
      onClose={dismiss}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={backDropTimeout}>
      <Grow
        timeout={250}
        in={open}>
        <div className={classes.confirmPaper}>
          <div className={classes.confirmModalHeader}>
            <Text
              align="center"
              size={20}
              weight={700}
              color={palette.text.primary}>
              Подтверждение удаления
            </Text>
            <Button
              disableRipple
              onClick={onClose}
              className={classes.confirmClose}>
              <Close />
            </Button>
          </div>
          <div className={classes.confirmBody}>
            <Box mb={1}>
              <Text
                align="center"
                size={14}
                weight={300}>
                {title}
              </Text>
            </Box>
            {children}
          </div>
          <div className={classes.confirmFooter}>
            <CustomButton
              onClick={dismiss}
              extStyle={classes.confirmButton}
              bg={colorTheme.GREY_HARD}>
              Нет
            </CustomButton>
            <Box ml={1}>
              <CustomButton
                onClick={_onConfirm}
                extStyle={classes.confirmButton}
                bg={colorTheme.ORANGE}>
                Да
              </CustomButton>
            </Box>
          </div>
        </div>
      </Grow>
    </ModalWin>
  );
}

ConfirmModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  afterConfirmed: PropTypes.func,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  deps: PropTypes.any,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default memo(ConfirmModal);
