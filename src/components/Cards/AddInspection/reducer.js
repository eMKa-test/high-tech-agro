import moment from "moment";

const SET_CARD = "SET_CARD";
export const actionSetCard = (card) => ({type: SET_CARD, card});
const INIT = "INIT";
export const actionInit = (barns, match, users, profile) => ({
  type: INIT, barns, match, users, profile,
});
const OPEN_DATE = "OPEN_DATE";
export const actionOpenDate = (openDate) => ({type: OPEN_DATE, openDate});
const LOAD = "LOAD";
export const actionLoad = (load) => ({type: LOAD, load});
const SET_OPTION = "SET_OPTION";
export const actionSetOption = (options) => ({type: SET_OPTION, options});
const SET_ERROR = "SET_ERROR";
export const actionSetError = (error) => ({type: SET_ERROR, error});

export const initialState = () => ({
  card: {
    date: moment().format("YYYY-MM-DD"),
  },
  barns: [],
  options: {
    managerId: null,
    barnId: null,
  },
  selectedBarn: null,
  openDate: false,
  load: false,
  managers: [],
  error: null,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      const {
        barns, match, users, profile,
      } = action;
      const formBarns = [];
      const managers = [];
      let barnSlug = "";
      let selectedBarn = null;
      if (match && match?.params?.barnId) {
        barnSlug = match.params.barnId;
      }
      barns.forEach((barn) => {
        if (barnSlug && barnSlug === barn.slug) {
          selectedBarn = {value: barn.uuid, label: barn.title};
        }
        formBarns.push({
          label: barn.title,
          value: barn.uuid,
        });
      });
      if (users?.length > 0) {
        users.forEach((el) => {
          if (el.role === "manager") {
            managers.push({
              label: el.name,
              value: el.uuid,
            });
          }
        });
      }
      const finalState = {
        ...state, barns: formBarns, managers,
      };
      if (profile) {
        Object.assign(finalState, {
          options: {
            ...state.options,
            managerId: {value: profile.uuid, label: profile.name},
          },
          card: {
            ...state.card,
            managerId: profile.uuid,
          },
        });
      }
      if (selectedBarn) {
        Object.assign(finalState, {
          options: {
            ...state.options,
            ...finalState.options,
            barnId: selectedBarn,
          },
          card: {
            ...state.card,
            ...finalState.card,
            barnId: selectedBarn.value,
          },
        });
      }
      return finalState;
    }
    case SET_CARD: {
      const {card} = action;
      return {...state, card};
    }
    case OPEN_DATE: {
      const {openDate} = action;
      return {...state, openDate};
    }
    case SET_ERROR: {
      const {error} = action;
      return {...state, error};
    }
    case SET_OPTION: {
      const {options} = action;
      return {...state, options: {...state.options, ...options}};
    }
    case LOAD: {
      const {load} = action;
      return {...state, load};
    }
    default:
      return state;
  }
};
