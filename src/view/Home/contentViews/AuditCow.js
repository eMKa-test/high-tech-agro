import {
  memo, useCallback, useEffect, useState,
} from "react";
import {useRouteMatch} from "react-router";
import {makeStyles} from "@material-ui/styles";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import styles from "../styles";
import {getData} from "../../../common/api/request";
import Header from "../../../components/HoofIll/Header";
import HoofIll from "../../../components/HoofIll";
import useAsyncFetch from "../../../common/hooks/useAsyncFetch";
import {COWS_LIMIT} from "../../../common/vars";

const useStyles = makeStyles(styles);

function Audit() {
  const {params} = useRouteMatch("/audit/card/:auditId/cow/:cowId");
  const classes = useStyles();
  const [loadCow, setLoadCow] = useState(true);
  const [loadAudit, auditPayload] = useAsyncFetch(`/audit/${params.auditId}`);
  const [cow, setCow] = useState(null);

  const audit = get(auditPayload, "payload", {});

  const getCow = useCallback(async (callback) => {
    try {
      setLoadCow(true);
      const {cowId} = params;
      const response = await getData(`/cows/${cowId}`, {limit: COWS_LIMIT});
      if (response && !isEmpty(response?.payload)) {
        setCow(response.payload);
        if (typeof callback === "function") {
          callback(response.payload.graph);
        }
      }
      setLoadCow(false);
    } catch (err) {
      console.error(err);
      setLoadCow(false);
    }
  }, [params?.cowId]);

  useEffect(() => {
    if (params?.cowId) {
      getCow();
    }
  }, [params?.cowId]);

  if (loadCow && !cow) {
    return null;
  }

  return (
    <div className={classes.rootAuditCow}>
      <div className={classes.rootAuditCowWrapper}>
        <Header
          audit={audit}
          cow={cow} />
        <HoofIll
          cow={cow}
          updateCow={getCow} />
      </div>
    </div>
  );

}

export default memo(Audit);
