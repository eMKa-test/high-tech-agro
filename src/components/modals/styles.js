export const modalStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    overflow: "hidden",
    position: "relative",
    maxHeight: "calc(100% - 100px)",
    "@media (max-width:400px)": {
      width: "100%",
    },
    "@media (max-width:330px)": {
      width: "100%",
      padding: theme.spacing(4, 3),
    },
    width: "auto",
    display: "flex",
    minHeight: 150,
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    "&:focus": {
      outline: "none",
    },
  },
  confirmPaper: {
    overflow: "hidden",
    position: "relative",
    "@media (max-width:400px)": {
      width: "100%",
    },
    width: "auto",
    maxWidth: 250,
    backgroundColor: theme.palette.common.white,
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    "&:focus": {
      outline: "none",
    },
  },
  confirmBody: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(0, 2),
  },
  confirmModalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0,
  },
  modalClose: {
    cursor: "pointer",
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      right: 0,
      top: 0,
    },
    right: 10,
    top: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmClose: {
    position: "absolute",
    right: 5,
    top: 5,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    minWidth: 80,
  },
});

export const alertStyles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export const datePickerStyles = (theme) => ({
  root: {
    "& .MuiDialogActions-root": {
      padding: "0 8px",
    },
    "& .MuiButton-textPrimary": {
      color: theme.text.primary,
    },
  },
  wrapperDay: {
    borderRadius: 10,
    fontWeight: 500,
  },
  day: {
    color: "inherit",
    width: "36px",
    height: "36px",
    margin: "0 2px",
    padding: 0,
    fontSize: 16,
    fontWeight: "inherit",
    borderRadius: 10,
  },
  selectedDay: {
    color: theme.palette.common.white,
    backgroundColor: theme.props.ORANGE.main,
    "&:hover": {
      backgroundColor: theme.props.ORANGE.dark,
    },
  },
  currentDay: {
    fontWeight: 600,
    color: theme.props.BLUE.main,
    textDecoration: "underline",
  },
  rangeDays: {
    color: theme.palette.common.white,
    borderRadius: 0,
    backgroundColor: theme.props.ORANGE.main,
    "&:hover": {
      backgroundColor: theme.props.ORANGE.dark,
    },
  },
  selectedFirstDay: {
    color: theme.palette.common.white,
    backgroundColor: theme.props.ORANGE.main,
    "&:hover": {
      backgroundColor: theme.props.ORANGE.dark,
    },
    borderRadius: "10px 0 0 10px",
  },
  selectedLastDay: {
    color: theme.palette.common.white,
    backgroundColor: theme.props.ORANGE.main,
    "&:hover": {
      backgroundColor: theme.props.ORANGE.dark,
    },
    borderRadius: "0 10px 10px 0",
  },
});

export default null;
