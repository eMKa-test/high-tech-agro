import {memo} from "react";
import {makeStyles} from "@material-ui/styles";
import Alert from "../modals/alert";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function Page404() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert
        variant="outlined"
        color="info"
        message="Запрашиваемая страница не найдена"
        title="Page 404" />
    </div>
  );
}

export default memo(Page404);
