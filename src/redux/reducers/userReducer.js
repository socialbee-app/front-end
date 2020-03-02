import * as actionTypes from "../types";

const initialState = {
  isAuthenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case actionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case actionTypes.SET_USER:
      return {
        isAuthenticated: true,
        loading: false,
        ...action.payload
      };
    case actionTypes.LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case actionTypes.LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            username: state.credentials.username,
            postId: action.payload.postId
          }
        ]
      };
    case actionTypes.UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(like => like.postId === action.payload.postId)
      };
    default:
      return state;
  }
};
