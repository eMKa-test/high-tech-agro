import {memo} from "react";
import {makeStyles} from "@material-ui/styles";
import {CardHeader} from "@material-ui/core";
import styles from "./styles";

const useStyles = makeStyles(styles);

function LoginHeader() {
  const classes = useStyles();
  return (
    <CardHeader
      className={classes.cardHeader}
      title="Вход в сервис"
      subheader="укажите необходимые данные обязательные поля помечены *" />
  );
}

export default memo(LoginHeader);
