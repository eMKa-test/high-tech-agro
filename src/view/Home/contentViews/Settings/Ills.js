import {
  memo, useCallback, useEffect, useState,
} from "react";
import {makeStyles, Box} from "@material-ui/core";
import styles from "../../styles";
import HoofIll from "../../../../components/HoofIll";
import {getData} from "../../../../common/api/request";
import ViewTitle from "../../../../components/ViewTitle";
import {ILLS_LIMIT} from "../../../../common/vars";

const useStyles = makeStyles(styles);

function Ills() {
  const classes = useStyles();
  const [load, setLoad] = useState(true);
  const [ills, setIlls] = useState(null);

  const getIlls = useCallback(async () => {
    try {
      const response = await getData("/ills", {params: {limit: ILLS_LIMIT}});
      if (Array.isArray(response.payload)) {
        setIlls(response.payload);
      }
      setLoad(false);
    } catch (err) {
      console.error(err);
      setLoad(false);
    }
  }, []);

  useEffect(getIlls, []);

  return (
    <div className={classes.rootContent}>
      <div className={classes.rootContentWrapper}>
        <Box>
          <ViewTitle text="Настройка болезней" />
        </Box>
        <HoofIll
          updateIlls={getIlls}
          ills={ills} />
      </div>
    </div>
  );
}

export default memo(Ills);
