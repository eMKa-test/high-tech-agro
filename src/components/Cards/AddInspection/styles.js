import {BG} from "../../../common/themeConstants";

const styles = (theme) => ({
  container: {
    minWidth: 270,
    "@media (min-width:374px) and (max-width:380px)": {
      padding: theme.spacing(0),
      width: "100%",
    },
    padding: theme.spacing(2, 3),
  },
  datePickerCardButton: {
    borderRadius: 10,
    backgroundColor: BG,
    minHeight: 48,
    border: "none",
    "&:hover": {
      backgroundColor: BG,
    },
    "& .MuiButton-label": {
      justifyContent: "flex-start",
      marginLeft: 12,
    },
    "& .MuiButton-startIcon": {
      marginRight: 22,
    },
  },
  asideActionButton: {
    minHeight: 48,
    borderRadius: 10,
  },
  loaderContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFieldRoot: {
    borderRadius: 10,
    backgroundColor: BG,
    height: 48,
    border: "none",
    width: "100%",
    paddingLeft: 24,
    paddingRight: 24,
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
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
  autoCompleteCows: {
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input": {
      padding: "9.5px 5px",
    },
  },
  autoCompleteOthers: {
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input": {
      padding: "9.5px 14px",
    },
  },
  autocompleteStyle: {
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
      padding: "6.5px 9px 6.5px 24px",
      fontSize: 14,
      fontWeight: 300,
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
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336 !important",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
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
        borderColor: "transparent",
      },
    },
  },
  errorTitle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0,
  },
});

export default styles;
