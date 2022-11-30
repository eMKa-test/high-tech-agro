import {BG} from "../../../common/themeConstants";

const styles = (theme) => ({
  rootStep: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
    padding: theme.spacing(2),
    width: 575 - theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      width: "100%",
    },
  },
  stepperWrap: {
    display: "flex",
    flexWrap: "nowrap",
  },
  unactiveStep: {
    display: "none",
  },
  stepWrapper: {
    padding: "0 100px",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  animateFormContainer: {
    transition: theme.transitions.create(["left"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: "relative",
    display: "flex",
    flexWrap: "nowrap",
  },
  stepItem: {
    flex: 1,
  },
  stepperFooterStyle: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 100px",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  buttonSpace: {
    marginRight: theme.spacing(4),
  },
  textFieldRoot: {
    borderRadius: 10,
    backgroundColor: BG,
    height: 48,
    borderColor: "transparent",
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "0.875rem",
      color: theme.text.primary,
      textAlign: "center",
      "&::placeholder": {
        color: theme.text.primary,
      },
    },
  },
  autocompleteStyle: {
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
      padding: "6.5px 9px 6.5px 24px",
      fontSize: 14,
      fontWeight: 300,
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input": {
      padding: "9.5px 14px",
    },
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-endAdornment": {
      right: 16,
    },
    "& .MuiAutocomplete-groupLabel": {
      fontSize: 14,
    },
  },
  textFieldRootAutocomplete: {
    borderRadius: 10,
    backgroundColor: BG,
    "& label": {
      fontSize: 16,
      transform: "translate(14px, 16px) scale(1)",
    },
    "& label.Mui-focused": {
      color: theme.props.ORANGE.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.props.ORANGE.main,
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: theme.props.ORANGE.main,
      },
    },
  },
  radioGroup: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  radio: {
    marginRight: 0,
  },
});

export default styles;
