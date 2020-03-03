import * as actionTypes from "../types";
import axios from "axios";
import { act } from "react-dom/test-utils";

// fetch all posts
export const getPosts = () => dispatch => {
  dispatch({ type: actionTypes.LOADING_DATA });
  axios
    .get("/posts")
    .then(res => {
      dispatch({
        type: actionTypes.SET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.SET_POSTS,
        payload: []
      });
    });
};

// Add a new post
export const addPost = post => dispatch => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
    .post("/post", post)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_POST,
        payload: res.data
      });
      dispatch({
        type: actionTypes.CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    });
};

// like a post
export const likePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/like`)
    .then(res => {
      dispatch({
        type: actionTypes.LIKE_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// unlike a scream
export const unlikePost = postId => dispatch => {
  axios
    .get(`/post/${postId}/unlike`)
    .then(res => {
      dispatch({
        type: actionTypes.UNLIKE_POST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// delete a post
export const deletePost = postId => dispatch => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({ type: actionTypes.DELETE_POST, payload: postId });
    })
    .catch(err => console.log(err));
};
