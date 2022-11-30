import {
  memo, useCallback, useEffect, useReducer,
} from "react";
import * as PropTypes from "prop-types";
import {getData} from "../../common/api/request";
import Contacts from "../Cards/Contact";
import {
  actionLoad,
  actionLoadNextPage,
  actionSetContacts,
  initialState,
  reducer,
  actionSetPage,
  actionAddContent,
} from "./reducer";
import {screenMediaRule} from "../../common/utils";
import Pagination from "../Inspections/Pagination";
import eventEmitter from "../../common/utils/emitter";

const setRequestParams = (param, restParams) => {
  const params = {...restParams, binds: true};
  if (param) {
    const res = param?.farmId ? {farm: param.farmId} : {barn: param.barnId};
    Object.assign(params, {...res});
  }
  return {params};
};

function ContactsList({routeParams}) {
  const [{
    contacts, load, page, pages, limit, offset, count, loadNextPage, contactsGrid,
  }, dispatch] = useReducer(reducer, initialState(), initialState);
  const phone = screenMediaRule(767, "max-width");
  const phoneLandscape = screenMediaRule(812, "max-width", 400, "max-height");

  const getContacts = useCallback(async (params, callback) => {
    dispatch(actionLoad(true));
    dispatch(actionLoadNextPage(true));
    try {
      const res = await getData("/contacts", setRequestParams(routeParams, params));
      if (res) {
        if (typeof callback === "function") {
          callback(res);
        } else {
          dispatch(actionSetContacts(res));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(actionLoad(false));
      dispatch(actionLoadNextPage(false));
    }
  }, [routeParams, limit, offset]);

  useEffect(() => {
    if (!phone && !phoneLandscape) {
      getContacts({
        limit, offset,
      });
    }
  }, [routeParams?.farmId, routeParams?.barnId, page]);

  const onChangePage = useCallback((_, newPage) => {
    dispatch(actionSetPage(newPage));
  }, []);

  const onChangePageMobile = useCallback(() => {
    dispatch(actionSetPage(page + 1));
    const result = page * limit;
    getContacts({
      limit, offset: result,
    }, (response) => {
      dispatch(actionAddContent(response));
    });
  }, [routeParams, limit, offset, page]);

  const updateContacts = useCallback(() => {
    getContacts({
      limit, offset,
    });
  }, [routeParams, limit, offset]);

  useEffect(() => {
    eventEmitter.on("updateContacts", updateContacts);
    return () => eventEmitter.off("updateContacts", updateContacts);
  }, [routeParams, limit, offset]);

  return (
    <Contacts
      updateContacts={updateContacts}
      load={load}
      contacts={contacts}
      contactsGrid={contactsGrid}>
      <Pagination
        loadNextPage={loadNextPage}
        phoneLandscape={phoneLandscape}
        phone={phone}
        title="Контакты"
        page={page}
        limit={limit}
        count={count}
        onChangePageMobile={onChangePageMobile}
        onChangePage={onChangePage}
        pages={pages} />
    </Contacts>
  );
}

ContactsList.propTypes = {
  routeParams: PropTypes.shape({
    farmId: PropTypes.string,
    barnId: PropTypes.string,
  }),
};

export default memo(ContactsList);
