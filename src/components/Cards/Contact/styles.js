import {BG} from "../../../common/themeConstants";

const styles = (theme) => ({
  card: {
    minWidth: 273,
    maxWidth: 273,
    padding: theme.spacing(4),
    margin: 16,
    minHeight: 164,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.props.BLUE_LIGHT.main,
    "@media (max-width:737px) and (max-height:415px)": {
      margin: "8px",
    },
    "@media (max-width:736px) and (min-height:415px)": {
      margin: "8px",
      padding: theme.spacing(2),
    },
    "@media (max-width:668px) and (max-height:415px)": {
      margin: "8px",
      width: "100%",
      maxWidth: "none",
    },
    "@media (max-width:667px) and (min-height:415px)": {
      margin: "8px",
      width: "100%",
      maxWidth: "none",
      padding: theme.spacing(2),
    },
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: theme.spacing(5),
  },
  cardHeaderLeft: {
    display: "flex",
  },
  cardAvatar: {
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  propertiesContacts: {
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(1),
    margin: theme.spacing(2, 2, 1, 2),
  },
  contactCardsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    "@media (max-width:836px)": {
      justifyContent: "space-between",
    },
  },
  responsiveContactWrapper: {
    flex: 1,
  },
  gridWrapper: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contactPagination: {
    margin: theme.spacing(0, 2),
    flex: 0,
  },
  cardContactData: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(0, 3),
  },
  cardEditContact: {
    padding: 0,
  },
  link: {
    color: theme.props.BLUE.main,
  },
  noLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  cardFooterPhone: {
    marginBottom: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
  },
  cardFooterMail: {
    display: "flex",
    alignItems: "center",
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
});

export default styles;
