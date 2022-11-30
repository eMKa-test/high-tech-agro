import {BG} from "../../common/themeConstants";

const styles = (theme) => ({
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
      color: theme.text.primary,
      fontWeight: 600,
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
  rootEditProperty: {
    flex: 1,
    textAlign: "center",
    maxWidth: 270,
    minWidth: 240,
  },
  farmsSelectStyle: {
    maxWidth: 320,
    marginTop: 24,
  },
  chipsWrapper: {
    marginTop: 16,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  chipStyle: {
    color: theme.palette.common.white,
    backgroundColor: theme.props.ORANGE.main,
    margin: theme.spacing(0.5, 0),
    "& .MuiChip-deleteIcon": {
      color: theme.palette.common.white,
    },
  },
});

export default styles;
