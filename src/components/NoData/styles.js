const styles = (theme) => ({
  noDataRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    flex: 1,
  },
  paperNoData: {
    maxWidth: 160,
    minHeight: 180,
    padding: theme.spacing(4.375, 5.6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.props.BLUE_LIGHT.main,
  },
  buttonStyle: {
    minHeight: 38,
  },
});

export default styles;
