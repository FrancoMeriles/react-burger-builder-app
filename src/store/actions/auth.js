import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSucces = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    data: data
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    console.log(email, password);
    axios
      .post(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBBRq-diTw6LU7fU-nMwuN4TZODjIxv2zM`,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .then(response => {
        console.log(response);
        dispatch(authSucces(response.data));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};
