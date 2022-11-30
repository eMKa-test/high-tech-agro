import {memo} from "react";
import {makeStyles} from "@material-ui/styles";
import {useRouteMatch} from "react-router";
import styles from "../styles";
import ContactsList from "../../../components/Contacts";

const useStyles = makeStyles(styles);

function Contacts() {
  const match = useRouteMatch(["/contacts/barn/:barnId", "/contacts/:farmId"]);
  const classes = useStyles();

  return (
    <div className={classes.rootContent}>
      <ContactsList routeParams={match?.params} />
    </div>
  );
}

export default memo(Contacts);
