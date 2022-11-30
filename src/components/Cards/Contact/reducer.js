import isEmpty from "lodash/isEmpty";

const INIT = "INIT";
export const actionInit = (farms, barns) => ({type: INIT, farms, barns});
const SET_CARD = "SET_CARD";
export const actionSetCard = (card, mode) => ({type: SET_CARD, card, mode});
const SET_OPEN = "SET_OPEN";
export const actionSetOpen = (open) => ({type: SET_OPEN, open});
const LOAD = "LOAD";
export const actionLoad = (load) => ({type: LOAD, load});
const SET_MODE = "SET_MODE";
export const actionSetMode = (mode) => ({type: SET_MODE, mode});
const SET_SELECTED = "SET_SELECTED";
export const actionSetSelected = (item, isRemove) => ({type: SET_SELECTED, item, isRemove});
const SET_DISABLE = "SET_DISABLE";
export const actionSetDisable = (disableSelect) => ({type: SET_DISABLE, disableSelect});

export const initialState = () => ({
  open: false,
  properties: [],
  selected: [],
  mode: "",
  load: false,
  card: null,
  disableSelect: false,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      const {farms} = action;
      let result = [];
      if (farms?.length > 0) {
        farms.forEach((el) => {
          const farm = {
            value: el.uuid,
            label: el.title,
            type: "Farm",
          };
          result.push(farm);
          if (el?.barns?.length > 0) {
            const barn = el.barns.map((b) => ({
              value: b.uuid,
              label: b.title,
              type: "Barn",
            }));
            result = result.concat(barn);
          }
        });
      }
      return {...state, properties: result};
    }
    case LOAD: {
      const {load} = action;
      return {...state, load};
    }
    case SET_CARD: {
      const {card, mode} = action;
      let selected = [];
      const types = {
        farms: "Farm",
        barns: "Barn",
      };
      if (mode && mode === "update" && !isEmpty(card?.binds)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of Object.entries(card.binds)) {
          const arrays = val.map(({uuid, title}) => ({value: uuid, label: title, type: types[key]}));
          selected = selected.concat(arrays);
        }
      }
      return {
        ...state, card, mode: mode || state.mode, selected,
      };
    }
    case SET_OPEN: {
      const {open} = action;
      return {...state, open};
    }
    case SET_SELECTED: {
      const {item, isRemove} = action;
      let newSelected;
      if (isRemove === "remove") {
        newSelected = state.selected.filter((el) => el.value !== item.value);
      } else {
        newSelected = [...state.selected, item];
      }
      return {...state, selected: newSelected};
    }
    case SET_MODE: {
      const {mode} = action;
      return {...state, mode};
    }
    default:
      return state;
  }
};
