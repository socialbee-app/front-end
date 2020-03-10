import axios from "axios";
import * as actionTypes from "../types";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: actionTypes.CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.SET_ERRORS, payload: err.response.data });
    });
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: actionTypes.CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: actionTypes.SET_ERRORS, payload: err.response.data });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("IdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: actionTypes.SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
  dispatch({ type: actionTypes.LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificationsRead = notificationIds => dispatch => {
  axios
    .post("/notifications", notificationIds)
    .then(() => {
      dispatch({ type: actionTypes.MARK_NOTIFICATIONS_READ });
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  // sets the authorization header globally
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken;
};
