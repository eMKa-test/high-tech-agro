const styles = (theme) => ({
  rootSvg: {
    maxWidth: 826,
    width: "100%",
    maxHeight: 453,
    height: "100%",
    fill: "none",
  },
  numberZone: {
    cursor: "pointer",
    fill: "black",
    transition: theme.transitions.create("fill", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    "&:hover": {
      fill: theme.props.ORANGE.main,
    },
  },
  activeNumberZone: {
    fill: theme.props.ORANGE.main,
  },
  stock: {
    cursor: "pointer",
    transition: theme.transitions.create("fill", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    fill: "#BABABA",
    "& #title": {
      transition: theme.transitions.create("fill", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
    "&:hover": {
      fill: theme.props.ORANGE.main,
    },
    "&:hover #title": {
      fill: theme.palette.common.white,
    },
  },
  stockDark: {
    cursor: "pointer",
    transition: theme.transitions.create("fill", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    fill: "#909090",
    "& #title": {
      transition: theme.transitions.create("fill", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
    "&:hover": {
      fill: theme.props.ORANGE.main,
    },
    "&:hover #title": {
      fill: theme.palette.common.white,
    },
  },
  active: {
    fill: theme.props.ORANGE.main,
    "& #title": {
      fill: theme.palette.common.white,
    },
  },
});

export default styles;
