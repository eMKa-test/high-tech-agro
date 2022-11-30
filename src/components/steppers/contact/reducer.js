import {contactSteps as steps} from "../helpers";

export const initialState = () => ({
  step: 0,
  shift: 0,
  card: {},
  validName: false,
  farms: [],
  barns: [],
  loader: false,
  validStep: false,
});

const INIT = "INIT";
export const actionInit = (farms) => ({type: INIT, farms});
const LOADER = "LOADER";
export const actionLoader = (loader) => ({type: LOADER, loader});
const SET_STEP = "SET_STEP";
export const actionSetStep = (step) => ({type: SET_STEP, step});
const SET_CARD = "SET_CARD";
export const actionCard = (card, name) => ({type: SET_CARD, card, name});
const VALID_STEP = "VALID_STEP";
export const actionValidateStep = (validStep) => ({type: VALID_STEP, validStep});
const VALID_NAME = "VALID_NAME";
export const actionValidName = (validName) => ({type: VALID_NAME, validName});

export const reducer = (state, action) => {
  switch (action.type) {
    case INIT: {
      const {farms} = action;
      let barns = [];
      farms.forEach((farm) => {
        if (farm?.barns?.length > 0) {
          barns = barns.concat(farm.barns);
        }
      });
      return {...state, farms, barns};
    }
    case LOADER: {
      const {loader} = action;
      return {...state, loader};
    }
    case VALID_NAME: {
      const {validName} = action;
      return {...state, validName};
    }
    case VALID_STEP: {
      const {validStep} = action;
      return {...state, validStep};
    }
    case SET_CARD: {
      const {card} = action;
      return {...state, card: {...state.card, ...card}, validName: false};
    }
    case SET_STEP: {
      const {step} = action;
      const {step: stateStep} = state;
      const newStep = stateStep + step;
      if (newStep >= 0 || newStep < steps.length) {
        const shift = -(newStep * 100);
        return {...state, step: newStep, shift};
      }
      return state;
    }
    default:
      return state;
  }
};
