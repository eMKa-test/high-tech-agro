import {BG} from "../../../common/themeConstants";

const styles = (theme) => ({
  paperRoot: {
    position: "relative",
    minHeight: 200,
    padding: theme.spacing(3, 2),
    backgroundColor: "#E8EBF6",
    // "@media (max-width:836px)": {
    //   backgroundColor: "#E8EBF6",
    // },
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  editButton: {
    padding: 0,
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  propertyInfoRow: {
    marginTop: 15,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  propertyInfoTitle: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginRight: theme.spacing(1),
  },
  propertyUser: {
    marginTop: 25,
    display: "flex",
  },
  propertyUserAvatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: theme.spacing(3.5),
  },
  propertyUserInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  propertyContact: {
    marginTop: 25,
  },
  propertyContactRow: {
    display: "flex",
  },
  propertyGeo: {

  },
  link: {
    color: theme.props.BLUE.main,
  },
  noLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  rootEditProperty: {
    flex: 1,
    textAlign: "center",
    maxWidth: 270,
    minWidth: 240,
  },
  textFieldRootAddress: {
    borderRadius: 10,
    backgroundColor: BG,
    height: 48,
    border: "none",
    width: "100%",
    padding: theme.spacing(0, 1),
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
    marginTop: theme.spacing(3),
    minHeight: 48,
    borderRadius: 10,
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
