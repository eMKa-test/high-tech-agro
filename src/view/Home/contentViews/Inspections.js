import {memo} from "react";
import {useRouteMatch} from "react-router";
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import memoize from "lodash/memoize";
import styles from "../styles";
import PropertyCard from "../../../components/Cards/Property";
import InspectionsList from "../../../components/Inspections";
import {screenMediaRule} from "../../../common/utils";

const useStyles = makeStyles(styles);

const getparams = memoize((params) => {
  if (!params) {
    return false;
  }
  return params?.barnId ? {type: "barn", slug: params.barnId} : {type: "farm", slug: params?.farmId};
});

function Inspections() {
  const match = useRouteMatch(["/audit/barn/:barnId", "/audit/:farmId"]);
  const classes = useStyles();
  const media = screenMediaRule(836);
  const propertyParam = getparams(match?.params);

  return (
    <div className={classes.rootContent}>
      <Box className={classes.gridContainer}>
        <Box className={classes.gridItem}>
          <InspectionsList
            routeParams={match?.params} />
        </Box>
        {propertyParam ? (
          <Box
            ml={media ? 0 : 3}
            mr={media ? 0 : 2}
            className={classes.propertyWrapper}>
            <PropertyCard
              propertyParam={propertyParam} />
          </Box>
        ) : null}
      </Box>
    </div>
  );
}

export default memo(Inspections);
