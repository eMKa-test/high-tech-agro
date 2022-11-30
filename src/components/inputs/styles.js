import {BG} from "../../common/themeConstants";

const defaultButtonStyle = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: `background-color ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
});

export const customButtonStyles = (theme) => {
  return {
    buttonStyle: {
      ...defaultButtonStyle(theme),
    },
    squareButtonStyle: {
      padding: theme.spacing(1),
    },
  };
};

export const textFieldDropdownStyles = (theme) => ({
  rootSelect: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: BG,
    borderColor: BG,
    outline: "none",
    "& .MuiSelect-selectMenu": {
      padding: theme.spacing(0, 2),
      paddingLeft: theme.spacing(8),
      fontSize: 14,
      color: theme.palette.text.primary,
      fontWeight: 300,
      width: "100%",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: "1 !important",
    },
    "&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 1,
    },
    "& .MuiSelect-icon": {
      marginRight: 10,
    },
  },
  optionStyle: {
    fontSize: 16,
    color: theme.palette.text.primary,
    fontWeight: 300,
  },
  iconStyle: {
    zIndex: 1,
    position: "absolute",
    top: 15,
    left: 24,
  },
});

export default null;
