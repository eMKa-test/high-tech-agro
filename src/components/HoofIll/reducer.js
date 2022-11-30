import {getDiseases} from "./herlpers";

const SET_TYPE = "SET_TYPE";
export const actionSetType = (legType) => ({type: SET_TYPE, legType});
const SET_ZONE = "SET_ZONE";
export const actionSetZone = (activeZone) => ({type: SET_ZONE, activeZone});
const LOAD_ILLS = "LOAD_ILLS";
export const actionLoadIlls = (loadIlls) => ({type: LOAD_ILLS, loadIlls});
const GET_DISEASES = "GET_DISEASES";
export const actionGetDiseases = (diseases) => ({type: GET_DISEASES, diseases});
const GET_HOOF_ILLS = "GET_HOOF_ILLS";
export const actionGetHoofIlls = (hoofIlls) => ({type: GET_HOOF_ILLS, hoofIlls});
const SET_ILL = "SET_ILL";
export const actionSetIll = (ill) => ({type: SET_ILL, ill});
const SET_COW_ILLS = "SET_COW_ILLS";
export const actionSetCowIlls = (graph) => ({type: SET_COW_ILLS, graph});
const GET_LIST = "GET_LIST";
export const actionGetList = (list) => ({type: GET_LIST, list});
const OPEN_CONFIRM = "OPEN_CONFIRM";
export const actionOpenConfirm = (confirm) => ({type: OPEN_CONFIRM, confirm});

export const initialState = () => {
  return {
    load: false,
    loadIlls: false,
    activeType: "hoofFL",
    activeZone: "",
    diseases: [],
    confirm: null,
    hoofIlls: {},
    list: null,
    hoofBadges: null,
    selectedHoofIll: [],
    collect: {
      hoofFL: [],
      hoofFR: [],
      hoofBL: [],
      hoofBR: [],
    },
  };
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TYPE: {
      const {legType: activeType} = action;
      return {...state, activeType, activeZone: ""};
    }
    case SET_ZONE: {
      const {activeZone} = action;
      const {diseases, hoofIlls} = state;
      let selectedHoofIll = [];
      if (hoofIlls[activeZone] && diseases?.length > 0) {
        selectedHoofIll = diseases.filter((dis) => hoofIlls[activeZone].includes(dis.illId));
      }
      return {...state, activeZone, selectedHoofIll};
    }
    case GET_LIST: {
      const {diseases, activeType, activeZone} = state;
      if (diseases?.length === 0) {
        return state;
      }
      const list = getDiseases(diseases, activeType, activeZone);
      return {...state, list};
    }
    case SET_ILL: {
      const {ill} = action;
      const {collect, activeType, list} = state;
      let newHoofIll = [];
      if (collect[activeType].includes(ill)) {
        newHoofIll = collect[activeType].filter((item) => item.uuid !== ill);
      } else {
        const newIll = list.find((el) => el.illId === ill);
        newHoofIll = [...collect[activeType], newIll];
      }
      const newCollect = {...collect, [activeType]: newHoofIll};
      return {...state, ill, collect: newCollect};
    }
    case GET_DISEASES: {
      const {diseases} = action;
      return {...state, diseases};
    }
    case SET_COW_ILLS: {
      const {graph} = action;
      const {diseases, activeType} = state;
      const hoofBadges = {};
      if (graph[activeType]) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of Object.entries(graph[activeType])) {
          hoofBadges[key] = val.length;
        }
      }
      const newCollect = {
        hoofFL: [],
        hoofFR: [],
        hoofBL: [],
        hoofBR: [],
      };
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(graph)) {
        newCollect[key] = Object.values(value).flat().map((el) => {
          const match = diseases.find((item) => item.uuid === el);
          if (match) {
            return {
              diseaseId: match.uuid,
              title: match.ill.title,
              uuid: match.ill.uuid,
            };
          }
        });
      }
      return {...state, collect: newCollect, hoofBadges};
    }
    case GET_HOOF_ILLS: {
      const {hoofIlls} = action;
      const newHoofIlls = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, val] of Object.entries(hoofIlls)) {
        newHoofIlls[key] = val.map((el) => el.ill.uuid);
      }
      return {...state, hoofIlls: newHoofIlls};
    }
    case LOAD_ILLS: {
      const {loadIlls} = action;
      return {...state, loadIlls};
    }
    case OPEN_CONFIRM: {
      const {confirm} = action;
      return {...state, confirm};
    }
    default:
      return state;
  }
};
