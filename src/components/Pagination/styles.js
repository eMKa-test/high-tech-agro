const styles = (theme) => ({
  paginationRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationStyle: {
    backgroundColor: theme.props.BLUE_LIGHT.main,
    borderRadius: 10,
    "& .MuiPagination-ul": {
      minHeight: 55,
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      width: 45,
      height: 45,
      backgroundColor: theme.props.BLUE.main,
      color: theme.palette.common.white,
      boxShadow: "0px 7px 16px rgba(0, 0, 0, 0.14)",
      fontSize: 18,
      fontWeight: 600,
    },
    "& .MuiPaginationItem-root": {
      color: theme.props.BLUE.main,
      fontWeight: 500,
      width: 45,
      height: 45,
      justifyContent: "center",
    },
    "& .MuiPaginationItem-ellipsis": {
      lineHeight: 2.8,
    },
  },
});

export default styles;
