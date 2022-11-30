import {memo, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import styles from "./styles";
import LogoTitleIcon from "../../components/icons/logo_title";
import LoginHeader from "./LoginHeader";
import LoginBody from "./LoginBody";
import hideLoader from "../../common/utils/hideLoader";

const useStyles = makeStyles(styles);

function Login() {
  useEffect(hideLoader, []);
  const classes = useStyles();

  return (
    <div className="auth">
      <LogoTitleIcon />
      <Card className={classes.rootCard}>
        <LoginHeader />
        <LoginBody />
      </Card>
    </div>
  );
}

export default memo(Login);
