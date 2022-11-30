import {
  memo, useCallback, useContext, useEffect, useReducer,
} from "react";
import * as PropTypes from "prop-types";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import memoize from "lodash/memoize";
import styles from "./styles";
import {FarmsContext} from "../../../providers/Farms";
import Header from "./Header";
import PropertyInfo from "./PropertyInfo";
import PropertyUser from "./PropertyUser";
import FullPageLoader from "../../Loaders/Round/FullPage";
import {getData} from "../../../common/api/request";
import {
  reducer,
  initialState,
  actionSetInfo,
  actionSetProperty,
  actionLoad,
  actionSetOpen,
} from "./reducer";
import PropertyEdit from "./PropertyEdit";

const useStyles = makeStyles(styles);

const setRouteParam = memoize(({type, slug}) => {
  return {params: {[type]: slug}};
});

function PropertyCard({propertyParam}) {
  const classes = useStyles();
  const {farms, getProperty, getFarms} = useContext(FarmsContext);
  const [{
    info, property, load, open,
  }, dispatch] = useReducer(reducer, initialState(), initialState);

  const getInfo = useCallback(async () => {
    try {
      dispatch(actionLoad(true));
      const response = await getData("/info", setRouteParam(propertyParam));
      if (response) {
        dispatch(actionSetInfo(response));
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(actionLoad(false));
    }
  }, [propertyParam]);

  useEffect(() => {
    getInfo();
  }, [propertyParam]);

  useEffect(() => {
    if (farms.length > 0) {
      try {
        const response = getProperty(propertyParam.slug);
        dispatch(actionSetProperty(response));
      } catch (err) {
        console.error(err.message);
      }
    }
  }, [farms, propertyParam]);

  const openModal = useCallback(() => {
    dispatch(actionSetOpen(true));
  }, []);

  const closeModal = useCallback(() => {
    dispatch(actionSetOpen(false));
  }, []);

  return (
    <Paper
      elevation={0}
      className={classes.paperRoot}>
      <FullPageLoader load={load} />
      <Header
        openModal={openModal}
        property={property} />
      {propertyParam?.type === "barn" ? (
        <PropertyInfo info={info} />
      ) : null}
      <PropertyUser info={info} />
      <PropertyEdit
        updateFarms={getFarms}
        updateInfo={getInfo}
        open={open}
        dismiss={closeModal}
        info={info}
        property={property} />
    </Paper>
  );
}

PropertyCard.propTypes = {
  propertyParam: PropTypes.shape({
    type: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default memo(PropertyCard);
