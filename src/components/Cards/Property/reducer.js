const SET_INFO = "SET_INFO";
export const actionSetInfo = (info) => ({type: SET_INFO, info});
const SET_PROPERTY = "SET_PROPERTY";
export const actionSetProperty = (property) => ({type: SET_PROPERTY, property});
const LOAD = "LOAD";
export const actionLoad = (load) => ({type: LOAD, load});
const SET_OPEN = "SET_OPEN";
export const actionSetOpen = (open) => ({type: SET_OPEN, open});

export const initialState = () => ({
  info: null,
  property: null,
  load: false,
  open: false,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_INFO: {
      const {info} = action;
      return {...state, info};
    }
    case SET_PROPERTY: {
      const {property} = action;
      return {...state, property};
    }
    case SET_OPEN: {
      const {open} = action;
      return {...state, open};
    }
    case LOAD: {
      const {load} = action;
      return {...state, load};
    }
    default:
      return state;
  }
};
