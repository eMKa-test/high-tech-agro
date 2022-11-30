const styles = (theme) => ({
  step: {
    position: "relative",
  },
  stepBody: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  stepperIcon: {
    display: "flex",
    alignItems: "center",
    marginRight: 5,
  },
  progressBaseStyle: {
    backgroundColor: "#D1D4DC",
    width: "96%",
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#31C48D",
    },
    "& .MuiLinearProgress-bar1Determinate": {
      transition: theme.transitions.create(["transform"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
});

export default styles;
