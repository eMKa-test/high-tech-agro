import {
  memo, useCallback, useEffect, useReducer, useContext,
} from "react";
import * as PropTypes from "prop-types";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import debounce from "lodash/debounce";
import styles from "./styles";
import Header from "./Header";
import {getData} from "../../common/api/request";
import InspectionItems from "./InspectionItems";
import {
  initialState,
  reducer,
  actionSetAudits,
  actionLoad,
  actionSetPage,
  actionLoadNextPage,
  actionAddContent,
  actionSearch,
  actionSearchLoad,
} from "./reducer";
import {DatesContext} from "../../providers/Dates";
import {screenMediaRule} from "../../common/utils";
import Pagination from "./Pagination";

const useStyles = makeStyles(styles);
const setRequestParams = (param, restParams) => {
  const params = {...restParams};
  if (param) {
    const res = param?.farmId ? {farm: param.farmId} : {barn: param.barnId};
    Object.assign(params, {...res});
  }
  return {params};
};

function InspectionsList({routeParams}) {
  const [{
    audits, load, page, pages, limit, offset, count, loadNextPage, searchText, searchLoad,
  }, dispatch] = useReducer(reducer, initialState(), initialState);
  const classes = useStyles();
  const {
    startDate, endDate, setStartDate, setEndDate,
  } = useContext(DatesContext);
  const phone = screenMediaRule(767, "max-width");
  const phoneLandscape = screenMediaRule(812, "max-width", 400, "max-height");

  const getAudits = useCallback(async (params, callback) => {
    dispatch(actionLoad(true));
    dispatch(actionLoadNextPage(true));
    try {
      const res = await getData("/audit", setRequestParams(routeParams, params));
      if (res) {
        if (typeof callback === "function") {
          callback(res);
        } else {
          dispatch(actionSetAudits(res));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(actionLoad(false));
      dispatch(actionLoadNextPage(false));
    }
  }, [routeParams, startDate, endDate, limit, offset, searchText]);

  useEffect(() => {
    if (!phone && !phoneLandscape) {
      getAudits({
        startDate, endDate, limit, offset, s: searchText,
      });
    }
  }, [routeParams?.farmId, routeParams?.barnId, startDate, endDate, page]);

  const onChangePage = useCallback((_, newPage) => {
    dispatch(actionSetPage(newPage));
  }, []);

  const onChangePageMobile = useCallback(() => {
    dispatch(actionSetPage(page + 1));
    const result = page * limit;
    getAudits({
      startDate, endDate, limit, offset: result,
    }, (response) => {
      dispatch(actionAddContent(response));
    });
  }, [routeParams, startDate, endDate, limit, offset, page]);

  const debouncedSearch = debounce((text) => {
    getAudits({
      startDate, endDate, limit, offset: 0, s: text,
    });
    dispatch(actionSearchLoad(false));
  }, 800);

  const onSearch = useCallback((e) => {
    dispatch(actionSearchLoad(true));
    const {value} = e.target;
    dispatch(actionSearch(value));
    debouncedSearch(value);
  }, []);

  return (
    <div className={classes.inspectionsListRoot}>
      <Paper
        elevation={0}
        className={classes.inspectionsListPaper}>
        <Header
          searchLoad={searchLoad}
          searchText={searchText}
          onSearch={onSearch}
          routeParams={routeParams}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          updateAudits={getAudits} />
        <InspectionItems
          audits={audits}
          load={load} />
      </Paper>
      <Pagination
        loadNextPage={loadNextPage}
        phoneLandscape={phoneLandscape}
        phone={phone}
        page={page}
        title="Осмотры"
        limit={limit}
        count={count}
        onChangePageMobile={onChangePageMobile}
        onChangePage={onChangePage}
        pages={pages} />
    </div>
  );
}

InspectionsList.propTypes = {
  routeParams: PropTypes.shape({
    farmId: PropTypes.string,
    barnId: PropTypes.string,
  }),
};

export default memo(InspectionsList);
