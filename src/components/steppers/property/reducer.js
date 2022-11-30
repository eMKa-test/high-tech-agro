import {propertySteps as steps} from "../helpers";

export const initialState = () => ({
  step: 0,
  shift: 0,
  propertyType: 0,
  card: {},
  loader: false,
  validStep: true,
});

const LOADER = "LOADER";
export const actionLoader = (loader) => ({type: LOADER, loader});
const SET_PROPERTY = "SET_PROPERTY";
export const actionSetProperty = (propertyType) => ({type: SET_PROPERTY, propertyType});
const SET_STEP = "SET_STEP";
export const actionSetStep = (step) => ({type: SET_STEP, step});
const SET_CARD = "SET_CARD";
export const actionCard = (card) => ({type: SET_CARD, card});
const VALID_STEP = "VALID_STEP";
export const actionValidateStep = (validStep) => ({type: VALID_STEP, validStep});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADER: {
      const {loader} = action;
      return {...state, loader};
    }
    case VALID_STEP: {
      const {validStep} = action;
      return {...state, validStep};
    }
    case SET_PROPERTY: {
      const {propertyType} = action;
      if (propertyType === 1) {
        return {
          ...state, propertyType, card: {}, validStep: false,
        };
      }
      return {
        ...state, card: {}, propertyType, validStep: true,
      };
    }
    case SET_CARD: {
      const {card} = action;
      return {...state, card: {...state.card, ...card}};
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
