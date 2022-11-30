import {BG} from "../../common/themeConstants";

const styles = (theme) => ({
  rootUsers: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start",
    },
  },
  rootEdit: {
    flex: 1,
    textAlign: "center",
    maxWidth: 270,
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
  asideActionButton: {
    marginTop: theme.spacing(3),
    minHeight: 48,
    borderRadius: 10,
  },
  errorTitle: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    left: 0,
  },
  addUserContainer: {
    margin: theme.spacing(2, 2, 2, 2),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2),
    },
  },
  addUserButton: {
    minHeight: 54,
  },
});

export default styles;
