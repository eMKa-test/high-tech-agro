const styles = (theme) => ({
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
});

export default styles;
