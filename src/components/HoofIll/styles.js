import {BG} from "../../common/themeConstants";

const flexAligns = {
  display: "flex",
  alignItems: "center",
};

const styles = (theme) => ({
  headerWrapper: {
    ...flexAligns,
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
    "@media (max-width:415px)": {
      alignItems: "flex-start",
    },
  },
  header: {
    ...flexAligns,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  auditInfo: {
    ...flexAligns,
    "@media (max-width:767px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: theme.spacing(2),
    },
    justifyContent: "space-between",
  },
  auditDate: {
    ...flexAligns,
  },
  auditUser: {
    ...flexAligns,
  },
  auditType: {
    ...flexAligns,
  },
  buttonGroup: {
    "& .MuiButtonGroup-groupedOutlinedHorizontal:not(:first-child)": {
      marginLeft: 2,
    },
  },
  legType: {
    backgroundColor: theme.props.BLUE_LIGHT.main,
    borderColor: "#F3F3F3",
    "&:hover": {
      backgroundColor: theme.props.BLUE_LIGHT.dark,
    },
  },
  active: {
    backgroundColor: theme.props.ORANGE.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.props.ORANGE.dark,
    },
  },
  illsListRoot: {
    padding: theme.spacing(0, 0, 2, 0),
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    maxHeight: 700,
    borderRadius: 5,
    border: "1px solid rgba(198, 209, 221, 0.5)",
  },
  loadContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    width: "100%",
    height: 3,
  },
  illsList: {
    flex: 1,
    overflowY: "auto",
  },
  addIllButton: {
    textAlign: "center",
    flex: 0,
    marginTop: theme.spacing(2),
  },
  illItemContainer: {
    ...flexAligns,
    justifyContent: "space-between",
    padding: theme.spacing(0.5, 2, 0.5, 2),
    borderRadius: 10,
    maxWidth: 280,
  },
  illButtonItem: {
    justifyContent: "flex-start",
  },
  removeIllFromHoofType: {
    padding: 0,
    margin: theme.spacing(0, 0, 0, 1),
    border: `2px solid ${theme.props.ERROR.main}`,
    color: theme.props.ERROR.main,
    "& .MuiSvgIcon-root": {
      color: theme.props.ERROR.main,
      width: 14,
      height: 14,
    },
  },
  removeIllFromIllList: {
    padding: 2,
    border: `2px solid ${theme.props.ERROR.main}`,
    color: theme.props.ERROR.main,
    "& .MuiSvgIcon-root": {
      color: theme.props.ERROR.main,
      width: 14,
      height: 14,
    },
  },
  textFieldRoot: {
    borderRadius: 10,
    backgroundColor: BG,
    minHeight: 34,
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
  titleContainer: {
    ...flexAligns,
    justifyContent: "space-between",
    backgroundColor: theme.props.BLUE_LIGHT.main,
  },
  loadStumb: {
    height: 3,
  },
  audit: {
    display: "flex",
    flexDirection: "column",
  },
  auditRoot: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  gridBottomSpacing: {
    flexGrow: 1,
  },
  illListWrapper: {
    flexGrow: 1,
    alignSelf: "flex-start",
    maxWidth: 250,
    minWidth: 250,
  },
  hoofZones: {
    ...flexAligns,
    "@media (max-width:750px)": {
      marginBottom: 0,
    },
    marginBottom: 12,
  },
  wrapRows: {
    flexWrap: "wrap",
  },
  hoofZonesItem: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  hoofZoneIllRoot: {
    "@media (max-width:634px)": {
      display: "block",
    },
    display: "inline-flex",
    borderRadius: 5,
    border: "1px solid rgba(198, 209, 221, 0.5)",
    overflow: "hidden",
  },
  hoofZoneIllWrapper: {
    display: "flex",
    flexGrow: 1,
    "@media (max-width:634px)": {
      border: "none",
    },
    "&:not(:last-child)": {
      borderRight: "1px solid rgba(198, 209, 221, 0.5)",
    },
  },
  hoofZoneIll: {
    "@media (max-width:634px)": {
      flex: 1,
      maxWidth: "inherit",
    },
    maxWidth: 200,
    display: "flex",
    borderRadius: 0,
    flexDirection: "column",
  },
  bodyHoofZoneIll: {
    ...flexAligns,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
  },
  headerHoofZoneIll: {
    "@media (max-width:634px)": {
      borderRadius: "5px 5px 0 0",
    },
    padding: theme.spacing(2),
    backgroundColor: theme.props.BLUE_LIGHT.main,
  },
  selectedIll: {
    backgroundColor: theme.props.ORANGE.main,
    color: theme.palette.common.white,
  },
  divider: {
    height: 1,
    backgroundColor: theme.props.BLUE_LIGHT.main,
  },
  auditActionGroup: {
    "@media (max-width:596px)": {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(0),
    },
  },
  auditActionAddCow: {
    margin: theme.spacing(0, 1),
    "@media (max-width:596px)": {
      width: 44,
      height: 44,
      margin: theme.spacing(0.5, 0),
    },
  },
  auditActionSubmit: {
    "@media (max-width:596px)": {
      width: 44,
      height: 44,
      margin: 0,
    },
  },
  auditActionRemoveCow: {
    "@media (max-width:596px)": {
      width: 44,
      height: 44,
      margin: 0,
    },
  },
});

export default styles;
