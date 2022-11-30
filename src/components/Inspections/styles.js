const styles = (theme) => ({
  inspectionsListRoot: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
    "@media (max-width:836px)": {
      height: "auto",
    },
  },
  inspectionsListPaper: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  inspectionsListPaginationWrapper: {
    "@media (max-width:836px)": {
      backgroundColor: "white",
      marginTop: 0,
      padding: theme.spacing(0, 2),
    },
    marginTop: 8,
    flexGrow: 0,
  },
  addIcon: {
    backgroundColor: theme.props.BLUE.main,
    width: 60,
    height: 60,
    color: "white",
    position: "relative",
    boxShadow: "0px 13px 22px rgba(0, 0, 0, 0.12)",
    "@media (hover: none)": {
      backgroundColor: `${theme.props.BLUE.main} !important`,
    },
  },
  nextPageWrapper: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  nextPageLoader: {
    color: theme.props.ORANGE.main,
    position: "absolute",
    top: -4,
    left: -4,
    zIndex: 1,
  },
  datePickerButton: {
    border: `1px solid ${theme.props.BLUE.main}`,
    padding: theme.spacing(1, 4),
    height: "100%",
  },
  datePickerButtonMobile: {
    border: `1px solid ${theme.props.BLUE.main}`,
    padding: theme.spacing(1, 3),
    height: "100%",
    width: "100%",
  },
  filtersWrapper: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
  },
  searchInput: {
    height: "100%",
    flex: 1,
    maxWidth: 250,
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      outline: "none",
      border: `1px solid ${theme.props.GREY_LIGHT.main}`,
      height: "inherit",
      backgroundColor: theme.props.GREY_LIGHT.main,
    },
    "& .MuiOutlinedInput-input": {
      height: 48,
      fontSize: 14,
    },
  },
  searchInputMobile: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      outline: "none",
      border: `1px solid ${theme.props.GREY_LIGHT.main}`,
      height: "inherit",
      backgroundColor: theme.props.GREY_LIGHT.main,
    },
    "& .MuiOutlinedInput-input": {
      height: 48,
      fontSize: 14,
    },
  },
  headerRoot: {
    display: "flex",
    justifyContent: "space-between",
    "@media (max-width:414px)": {
      marginBottom: theme.spacing(2),
    },
    marginBottom: theme.spacing(3),
  },
  headerLeft: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
  },
  headerRight: {
    display: "flex",
  },
  filterButton: {
    padding: 0,
  },
  exportDataButton: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
    "@media (min-width:1600px)": {
      height: "100%",
    },
    "@media (max-width:1600px)": {
      paddingLeft: theme.spacing(2),
    },
    paddingLeft: theme.spacing(3),
    "& .MuiSvgIcon-root:first-child": {
      width: 24,
      marginRight: theme.spacing(2.5),
      "@media (max-width:1600px)": {
        marginRight: 0,
      },
    },
    "& .MuiSvgIcon-root:last-child": {
      marginLeft: theme.spacing(1),
      "@media (max-width:1600px)": {
        marginLeft: 0,
      },
    },
  },
  loaderContainer: {
    height: 1,
  },
  itemContainer: {
    "@media (max-width:735px)": {
      padding: theme.spacing(3, 0),
      flexWrap: "wrap",
    },
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainerMobile: {
    padding: theme.spacing(1, 0),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topItem: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  linkToAudit: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    flex: 1,
    "@media (max-width:735px)": {
      alignItems: "flex-start",
    },
    color: "inherit",
  },
  itemStyle: {
    display: "flex",
    alignItems: "center",
    "@media (max-width:735px)": {
      flex: 1.2,
    },
    justifyContent: "center",
  },
  itemStyleMobile: {
    display: "flex",
    alignItems: "center",
  },
  cowsCount: {
    width: 200,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cowsInfo: {
    display: "flex",
    alignItems: "center",
  },
  rightItems: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    "@media (max-width:735px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  inspectionMenu: {
    flex: 0,
    "@media (max-width:735px)": {
      flex: "1 0 50%;",
      justifyContent: "flex-end",
    },
  },
  percentWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  percentTitle: {
    position: "absolute",
    marginLeft: theme.spacing(0.5),
  },
  percentCow: {
    color: theme.props.BLUE.main,
    zIndex: 1,
  },
  top: {
    color: theme.props.BLUE_LIGHT.main,
    position: "absolute",
  },
  circle: {
    strokeLinecap: "round",
  },
  pageLoader: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transition: theme.transitions.create(["opacity", "visibility"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  activeLoader: {
    visibility: "visible",
    opacity: 1,
  },
  unActiveLoader: {
    visibility: "hidden",
    opacity: 0,
  },
  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flex: 1,
    "@media (max-width:1419px)": {
      // flexBasis: "50%",
    },
  },
  clearSearchButton: {
    transition: theme.transitions.create(["opacity", "visibility"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    opacity: 0,
    visibility: "hidden",
  },
  clearSearchButtonMobile: {
    transition: theme.transitions.create(["opacity", "visibility"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    opacity: 0,
    visibility: "hidden",
  },
  clearSearchButtonActive: {
    opacity: 1,
    visibility: "visible",
  },
  searchLoader: {
    position: "absolute",
    left: 9,
    display: "flex",
    alignItems: "center",
  },
});

export default styles;
