import {createRef} from "react";
import {SnackbarProvider} from "notistack";
import {withStyles} from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import {IconButton} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
  error: {
    backgroundColor: "#ff6c45 !important",
  },
  success: {
    backgroundColor: "#31C48D !important",
  },
};

class SnackBars extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ref = createRef();

  dismiss = (key) => () => {
    this.ref.current.closeSnackbar(key);
  }

  renderAction = (key) => {
    return (
      <IconButton
        size="small"
        disableRipple
        onClick={this.dismiss(key)}>
        <CloseIcon color="primary" />
      </IconButton>
    );
  }

  render() {
    const {children} = this.props;
    const {
      classes,
      iconVariant,
      anchorOrigin,
      maxSnack,
      autoHideDuration,
    } = this.props;
    return (
      <SnackbarProvider
        ref={this.ref}
        action={this.renderAction}
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
        }}
        autoHideDuration={autoHideDuration}
        iconVariant={iconVariant}
        anchorOrigin={anchorOrigin}
        maxSnack={maxSnack}>
        {children}
      </SnackbarProvider>
    );
  }
}

SnackBars.defaultProps = {
  iconVariant: {
    success: <CheckIcon />,
    error: <PriorityHighIcon />,
  },
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  maxSnack: 3,
  autoHideDuration: 2000,
};

SnackBars.propTypes = {
  iconVariant: PropTypes.shape({
    success: PropTypes.node,
    error: PropTypes.node,
  }),
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
  maxSnack: PropTypes.number,
  autoHideDuration: PropTypes.number,
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape({
    success: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(SnackBars);
