import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSucces = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSingup) => {
  return dispatch => {
    dispatch(authStart());
    console.log(email, password);
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBBRq-diTw6LU7fU-nMwuN4TZODjIxv2zM";
    if (!isSingup) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBBRq-diTw6LU7fU-nMwuN4TZODjIxv2zM";
    }
    axios
      .post(url, {
        email,
        password,
        returnSecureToken: true
      })
      .then(response => {
        console.log(response);
        dispatch(authSucces(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};
