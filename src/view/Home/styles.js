export default (theme) => ({
  rootAdmin: {
    display: "flex",
    height: "100%",
  },
  contentWrapper: {
    position: "relative",
    marginTop: theme.mixins.toolbar.minHeight,
    flex: 1,
    width: "100%",
    display: "flex",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight + 2}px)`,
    "@media (max-width:634px)": {
      // height: `calc(100% - ${theme.mixins.toolbar.minHeight + 100}px)`,
    },
  },
  asideActionButton: {
    height: 67,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 10,
    },
    // borderRadius: "10px 0 0 10px",
    borderRadius: 10,
  },
  cowsListWrapper: {
    height: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  cowList: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    marginBottom: 18,
  },
  list: {
    flex: 1,
    overflowY: "auto",
  },
  rootContent: {
    flexGrow: 1,
    overflowY: "auto",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
    padding: theme.spacing(4, 2, 4, 3),
    // padding: theme.spacing(6, 4, 2, 4),
    position: "relative",
  },
  rootContentWrapper: {
    padding: theme.spacing(2),
  },
  gridContainer: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width:836px)": {
      width: "100%",
      margin: 0,
      flexDirection: "column",
      height: "auto",
      backgroundColor: "white",
    },
  },
  gridItem: {
    width: "100%",
    height: "100%",
    "@media (max-width:836px)": {
      padding: "0 !important",
      marginRight: 0,
    },
  },
  propertyWrapper: {
    minWidth: 250,
    "@media (max-width:836px)": {
      padding: theme.spacing(2),
    },
  },
  auditContainer: {
    height: "calc(100% - 32px)",
    padding: theme.spacing(2, 2),
  },
  loader: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
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
  rootAudit: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1),
    },
    padding: theme.spacing(6, 4, 2, 4),
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  rootAuditCow: {
    flexGrow: 1,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
    padding: theme.spacing(6, 4, 2, 4),
    overflowY: "auto",
  },
  rootAuditWrapper: {
    "@media (max-width:834px)": {
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(10),
    },
    padding: theme.spacing(0, 1),
    // padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    minHeight: "100%",
  },
  rootAuditCowWrapper: {
    "@media (max-width:834px)": {
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(10),
    },
    padding: theme.spacing(0, 1),
    // padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: 10,
    minHeight: "100%",
  },
});
