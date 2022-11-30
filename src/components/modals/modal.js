import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {
  Modal as ModalWin, Backdrop, Grow, Button,
} from "@material-ui/core";
import Close from "@material-ui/icons/Clear";
import {modalStyles as styles} from "./styles";

const useStyles = makeStyles(styles);
const backDropTimeout = {timeout: 250};

function Modal(props) {
  const {
    open, onClose = () => null, children,
    afterOpen = () => null,
  } = props;
  const {text: colorTheme} = useTheme();
  const classes = useStyles();

  const dismiss = useCallback(() => {
    if (typeof onClose === "function") {
      onClose();
    }
  }, []);

  return (
    <ModalWin
      disableAutoFocus
      onRendered={afterOpen}
      className={classes.modal}
      open={open}
      onClose={dismiss}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={backDropTimeout}>
      <Grow
        timeout={250}
        in={open}>
        <div className={classes.paper}>
          <Button
            disableRipple
            onClick={onClose}
            className={classes.modalClose}>
            <Close htmlColor={colorTheme.primary} />
          </Button>
          {children}
        </div>
      </Grow>
    </ModalWin>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  afterOpen: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default memo(Modal);
