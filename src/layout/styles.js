export default (theme) => {
  const {width: drawerWidth} = theme.mixins.drawer;
  return {
    appBar: {
      width: "100%",
      [theme.breakpoints.between("md", "xl")]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    rootToolBar: {
      justifyContent: "space-between",
    },
    leftItem: {
      display: "flex",
      flexDirection: "row",
    },
    rightItem: {
      display: "flex",
    },
    appBarShift: {
      [theme.breakpoints.between("md", "xl")]: {
        width: drawerWidth,
      },
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerDesktop: {
      [theme.breakpoints.between("md", "xl")]: {
        width: drawerWidth,
      },
      flexShrink: 0,
    },
    drawerDesktopPaper: {
      [theme.breakpoints.between("md", "xl")]: {
        width: drawerWidth,
      },
      borderRight: 0,
    },
    drawer: {
      "@media (min-width:319px) and (max-width: 400px)": {
        width: "98%",
      },
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      "@media (min-width:319px) and (max-width: 400px)": {
        width: "80%",
        padding: 10,
      },
      height: "100%",
      padding: 30,
      width: drawerWidth,
      borderRight: 0,
    },
    drawerHeader: {
      marginBottom: 24,
      marginLeft: 28,
      display: "flex",
      alignItems: "center",
      ...theme.mixins.toolbar,
    },
    asideContent: {
      marginLeft: 28,
      overflowX: "hidden",
      height: "calc(100% - 171px)",
      display: "flex",
      flexDirection: "column",
    },
    animateIcons: {
      "& .MuiButton-label": {
        height: "100%",
        transition: theme.transitions.create(["transform"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      "&:hover .MuiButton-label": {
        transform: "rotate(15deg)",
      },
    },
  };
};
