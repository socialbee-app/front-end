import {
  SET_USER,
  // SET_ERRORS,
  // CLEAR_ERRORS,
  // LOADING_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from "../types";

const initialState = {
  isAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        isAuthenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
};
