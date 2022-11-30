const SET_CONTACTS = "SET_CONTACTS";
export const actionSetContacts = (contacts) => ({type: SET_CONTACTS, contacts});
const LOAD = "LOAD";
export const actionLoad = (load) => ({type: LOAD, load});
const LOAD_PAGE = "LOAD_PAGE";
export const actionLoadNextPage = (loadNextPage) => ({type: LOAD_PAGE, loadNextPage});
const SET_PAGE = "SET_PAGE";
export const actionSetPage = (page) => ({type: SET_PAGE, page});
const ADD_CONTENT = "ADD_CONTENT";
export const actionAddContent = (contacts) => ({type: ADD_CONTENT, contacts});

export const initialState = () => ({
  contacts: [],
  contactsGrid: null,
  load: true,
  loadNextPage: false,
  page: 1,
  pages: 0,
  limit: 9,
  offset: 0,
  count: 0,
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
    case ADD_CONTENT: {
      const {contacts} = action;
      return {
        ...state, contacts: state.contacts.concat(contacts?.payload),
      };
    }
    case SET_CONTACTS: {
      const {contacts} = action;
      const {limit} = state;
      const pages = Math.ceil(contacts.count / limit);
      let contactsList = [];
      let contactsGridList = null;
      if (contacts?.payload) {
        contactsList = [...contacts.payload];
      } else {
        contactsGridList = [...Object.entries(contacts).flatMap((x) => {
          return {
            title: x[0],
            items: x[1],
          };
        })];
      }
      return {
        ...state, contactsGrid: contactsGridList, contacts: contactsList, pages, count: contacts.count,
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
