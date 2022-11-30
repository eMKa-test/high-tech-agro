import {BG} from "../../../common/themeConstants";

const styles = (theme) => ({
  rootAddCow: {
    flex: 1,
    textAlign: "center",
    maxWidth: 270,
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
    minHeight: 48,
    borderRadius: 10,
  },
});

export default styles;
