import { createUserRequest, forgotPassword, resetPassword, login, getUserRequest, updateUser, logout } from '../../utils/BurgerApi';
import { IUserData } from '../types/autorization';
import { AppDispatch, AppThunk } from '../types/index';

export const AUTH_REQUEST: 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const AUTH_REQUEST_FAILED: 'AUTH_REQUEST_FAILED' = 'AUTH_REQUEST_FAILED';
export const CLEAR_USER: 'CLEAR_USER' = 'CLEAR_USER';
export const RESET: 'RESET' = 'RESET';
export const POST_FORGOT_PASSWORD_SUCCESS: 'POST_FORGOT_PASSWORD_SUCCESS' = 'POST_FORGOT_PASSWORD_SUCCESS';
export const POST_FORGOT_PASSWORD_FAILED: 'POST_FORGOT_PASSWORD_FAILED' = 'POST_FORGOT_PASSWORD_FAILED';

export const POST_RESET_PASSWORD_SUCCESS: 'POST_RESET_PASSWORD_SUCCESS' = 'POST_RESET_PASSWORD_SUCCESS';
export const POST_RESET_PASSWORD_FAILED: 'POST_RESET_PASSWORD_FAILED' = 'POST_RESET_PASSWORD_FAILED';

export const POST_LOGIN_USER_SUCCESS: 'POST_LOGIN_USER_SUCCESS' = 'POST_LOGIN_USER_SUCCESS';
export const POST_LOGIN_USER_FAILED: 'POST_LOGIN_USER_FAILED' = 'POST_LOGIN_USER_FAILED';

interface IAuthRequest {
  type: typeof AUTH_REQUEST;
}

interface IGetUserSuccess {
  type: typeof GET_USER_SUCCESS;
  user: IUserData;
  refreshToken?: string;
  accessToken?: string;
}

interface IAuthFailed {
  type: typeof AUTH_REQUEST_FAILED;
}

interface IClearUser {
  type: typeof CLEAR_USER;
}

interface IReset {
  type: typeof RESET;
}

interface IForgotPasswordSuccess {
  type: typeof POST_FORGOT_PASSWORD_SUCCESS;
}

interface IForgotPasswordFailed {
  type: typeof POST_FORGOT_PASSWORD_FAILED;
}

interface IResetPasswordSuccess {
  type: typeof POST_RESET_PASSWORD_SUCCESS;
}

interface IResetPasswordFailed {
  type: typeof POST_RESET_PASSWORD_FAILED;
}

interface IPostLoginUserSuccess {
  type: typeof POST_LOGIN_USER_SUCCESS;
}

interface IPostLoginUserFailed {
  type: typeof POST_LOGIN_USER_FAILED;
}

export type TAuthActions = IAuthRequest | IGetUserSuccess | IAuthFailed | IClearUser | IReset | IForgotPasswordSuccess | IForgotPasswordFailed | IResetPasswordSuccess | IResetPasswordFailed | IPostLoginUserSuccess | IPostLoginUserFailed;

export const createUser: AppThunk = ({ email, password, name }: IUserData) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: AUTH_REQUEST
    });
    createUserRequest({ email, password, name })
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
      .catch((err: Error) => {
        console.log(`Произошла ошибка:`);
        console.log(err);
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
      })
  }
}

export const forgotUserPassword : AppThunk = (emailValue: string) => {
  return function (dispatch: AppDispatch) {
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
      .catch((err: Error) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: POST_FORGOT_PASSWORD_FAILED
        })
      })
  }
}

export const resetUserPassword: AppThunk = (passwordValue: string, codeValue: string) => {
  return function (dispatch: AppDispatch) {
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
      .catch((err: Error) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: POST_RESET_PASSWORD_FAILED
        })
      })
  }
}

export const loginUser: AppThunk = ({ email, password }: IUserData) => {
  return function (dispatch: AppDispatch) {
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
      .catch((err: Error) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
      })
  }
}

export const getUserData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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

export const logoutUser: AppThunk =  () => {
  return function (dispatch: AppDispatch) {
    logout()
      .then((res) => {
        dispatch({
          type: CLEAR_USER
        });
      })
      .catch((err: Error) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}


export const patchUserData: AppThunk = ({ name, email, password }: IUserData) => {
  return function (dispatch: AppDispatch) {
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
      .catch((err: Error) => {
        dispatch({
          type: AUTH_REQUEST_FAILED
        })
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}
