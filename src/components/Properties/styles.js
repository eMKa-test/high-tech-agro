const styles = (theme) => ({
  rootPropertiesList: {

  },
  listStyle: {
    minHeight: 67,
    [theme.breakpoints.down("sm")]: {
      borderRadius: 10,
    },
    // borderRadius: "10px 0 0 10px",
    borderRadius: 10,
  },
  listParent: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandStyle: {
    marginLeft: 20,
    transform: "rotate(0deg)",
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  rotateExpand: {
    transform: "rotate(180deg)",
  },
  listIconParentStyle: {
    minWidth: 56,
  },
  listIconChildStyle: {
    minWidth: 32,
  },
  openedParent: {
    backgroundColor: theme.props.BLUE_LIGHT.main,
  },
  openedParentHover: {
    "&:hover": {
      backgroundColor: theme.props.BLUE_LIGHT.dark,
    },
  },
  childWarpper: {
    margin: "5px 0",
  },
  listStyleChild: {
    paddingLeft: theme.spacing(5),
    minHeight: 55,
  },
});

export default styles;
