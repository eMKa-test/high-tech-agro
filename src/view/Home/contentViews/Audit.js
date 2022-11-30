import {
  memo, useCallback, useEffect, useState,
} from "react";
import {useRouteMatch, useHistory} from "react-router";
import {makeStyles} from "@material-ui/styles";
import styles from "../styles";
import {getData} from "../../../common/api/request";
import Header from "../../../components/HoofIll/Header";
import eventEmitter from "../../../common/utils/emitter";
import NoData from "../../../components/NoData/NoData";

const useStyles = makeStyles(styles);

function Audit() {
  const {params} = useRouteMatch("/audit/card/:auditId");
  const history = useHistory();
  const classes = useStyles();
  const [loadAudit, setLoadAudit] = useState(true);
  const [audit, setAudit] = useState(null);

  const getAudit = useCallback(async () => {
    try {
      setLoadAudit(true);
      const {auditId} = params;
      const {payload} = await getData(`/audit/${auditId}`);
      setLoadAudit(false);
      setAudit(payload);
    } catch (err) {
      console.error(err);
      setLoadAudit(false);
    }
  }, [params?.auditId]);

  useEffect(() => {
    if (params?.auditId) {
      getAudit();
    }
  }, [params?.auditId]);

  const toCow = useCallback(() => {
    if (audit?.cows?.length > 0) {
      const url = `/audit/card/${audit.uuid}/cow/${audit.cows[0]?.uuid}`;
      history.push(url);
    }
  }, [audit]);

  useEffect(() => {
    if (audit?.cows?.length > 0) {
      eventEmitter.on("toCow", toCow);
    }
    return () => eventEmitter.off("toCow", toCow);
  }, [audit]);

  if (loadAudit) {
    return null;
  }

  if (audit?.cows?.length === 0) {
    return (
      <div className={classes.rootAudit}>
        <NoData type="noCows" />
      </div>
    );
  }

  return (
    <div className={classes.rootAudit}>
      <Header audit={audit} />
      <NoData type="toCow" />
    </div>
  );

}

export default memo(Audit);
