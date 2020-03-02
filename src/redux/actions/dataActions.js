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
