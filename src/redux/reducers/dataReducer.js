import * as actionTypes from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case actionTypes.SET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case actionTypes.LIKE_POST:
    case actionTypes.UNLIKE_POST:
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      return {
        ...state
      };
    case actionTypes.DELETE_POST:
      let newPostsList = state.posts.filter(
        post => post.postId !== action.payload
      );
      return {
        ...state,
        posts: [...newPostsList]
      };
    case actionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case actionTypes.SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    default:
      return state;
  }
};
