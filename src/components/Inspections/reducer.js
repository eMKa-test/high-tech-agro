const SET_AUDITS = "SET_AUDITS";
export const actionSetAudits = (audits) => ({type: SET_AUDITS, audits});
const LOAD = "LOAD";
export const actionLoad = (load) => ({type: LOAD, load});
const LOAD_PAGE = "LOAD_PAGE";
export const actionLoadNextPage = (loadNextPage) => ({type: LOAD_PAGE, loadNextPage});
const SET_PAGE = "SET_PAGE";
export const actionSetPage = (page) => ({type: SET_PAGE, page});
const ADD_CONTENT = "ADD_CONTENT";
export const actionAddContent = (audits) => ({type: ADD_CONTENT, audits});
const SET_SEARCH = "SET_SEARCH";
export const actionSearch = (searchText) => ({type: SET_SEARCH, searchText});
const SEARCH_LOAD = "SEARCH_LOAD";
export const actionSearchLoad = (searchLoad) => ({type: SEARCH_LOAD, searchLoad});

export const initialState = () => ({
  audits: [],
  load: true,
  loadNextPage: false,
  page: 1,
  pages: 0,
  limit: 5,
  offset: 0,
  count: 0,
  searchText: "",
  searchLoad: false,
});

export const reducer = (state, action) => {
  switch (action.type) {
    case LOAD: {
      const {load} = action;
      return {...state, load};
    }
    case LOAD_PAGE: {
      const {loadNextPage} = action;
      return {...state, loadNextPage};
    }
    case SEARCH_LOAD: {
      const {searchLoad} = action;
      return {...state, searchLoad};
    }
    case SET_SEARCH: {
      const {searchText} = action;
      return {...state, searchText};
    }
    case ADD_CONTENT: {
      const {audits} = action;
      return {
        ...state, audits: state.audits.concat(audits.payload),
      };
    }
    case SET_AUDITS: {
      const {audits} = action;
      const {limit} = state;
      const pages = Math.ceil(audits.count / limit);
      return {
        ...state, audits: audits.payload, pages, count: audits.count,
      };
    }
    case SET_PAGE: {
      const {page} = action;
      return {...state, page, offset: (page - 1) * state.limit};
    }
    default:
      return state;
  }
};
