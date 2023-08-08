import { createUserRequest, forgotPassword, resetPassword, login, getUserRequest, updateUser, logout } from '../../utils/BurgerApi';

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const AUTH_REQUEST_FAILED = 'AUTH_REQUEST_FAILED';
export const CLEAR_USER = 'CLEAR_USER';
export const RESET = 'RESET';
export const POST_FORGOT_PASSWORD_SUCCESS = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_FAILED = 'POST_FORGOT_PASSWORD_FAILED';

export const POST_RESET_PASSWORD_SUCCESS = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_FAILED = 'POST_RESET_PASSWORD_FAILED';

export const POST_LOGIN_USER_SUCCESS = 'POST_LOGIN_USER_SUCCESS';
export const POST_LOGIN_USER_FAILED = 'POST_LOGIN_USER_FAILED';


export function createUser({ email, password, username }) {
  return function (dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    createUserRequest({ email, password, username })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
            refreshToken: res.refreshToken,
            accessToken: res.accessToken
          });
        } else {
          dispatch({
            type: AUTH_REQUEST_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка:`);
        console.log(err);
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
      })
  }
}

export function forgotUserPassword(emailValue) {
  return function (dispatch) {
    forgotPassword(emailValue)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: POST_FORGOT_PASSWORD_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: POST_FORGOT_PASSWORD_FAILED
        })
      })
  }
}

export function resetUserPassword(passwordValue, codeValue) {
  return function (dispatch) {
    resetPassword(passwordValue, codeValue)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: POST_RESET_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: POST_RESET_PASSWORD_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: POST_RESET_PASSWORD_FAILED
        })
      })
  }
}

export function loginUser({ email, password }) {
  return function (dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    login({ email, password })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
            refreshToken: res.refreshToken,
            accessToken: res.accessToken
          });
        } else {
          dispatch({
            type: AUTH_REQUEST_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
      })
  }
}

export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    getUserRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user
          });
        } else {
          dispatch({
            type: AUTH_REQUEST_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка`);
        console.log(err);
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
      })
  }
}

export function logoutUser() {
  return function (dispatch) {
    logout()
      .then((res) => {
        dispatch({
          type: CLEAR_USER
        });
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}


export function patchUserData({ name, email, password }) {
  return function (dispatch) {
    dispatch({
      type: AUTH_REQUEST
    })
    updateUser({ name, email, password })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: { name, email, password }
          })
        } else {
          dispatch({
            type: AUTH_REQUEST_FAILED
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}
