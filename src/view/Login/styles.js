import {BG} from "../../common/themeConstants";

export default (theme) => ({
  rootCard: {
    [theme.breakpoints.down("sm")]: {
      width: 220,
      padding: "0 36px 20px 36px",
      marginTop: 23,
    },
    [theme.breakpoints.up("sm")]: {
      width: 283,
      padding: "0 56px 30px 56px",
      marginTop: 53,
    },
    boxShadow: "none",
    borderRadius: 10,
    textAlign: "center",
  },
  cardHeader: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: 36,
    },
    "& .MuiTypography-h5": {
      fontSize: "1.25rem",
      fontWeight: 900,
    },
    "& .MuiTypography-body1": {
      fontWeight: 300,
      fontSize: 14,
      color: "#000000",
      marginTop: 5,
    },
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
});
