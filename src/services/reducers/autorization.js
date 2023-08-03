import {
  AUTH_REQUEST,
  GET_USER_SUCCESS,
  AUTH_REQUEST_FAILED,
  CLEAR_USER,
  POST_FORGOT_PASSWORD_SUCCESS,
  POST_FORGOT_PASSWORD_FAILED,
  POST_RESET_PASSWORD_SUCCESS,
  POST_RESET_PASSWORD_FAILED,

} from '../actions/autorization';

const initialUserState = {
  user: null,
  isAuthChecked: true,
  userFailed: false,
  forgotPassword: false,
  forgotPasswordFailed: false,
  resetPassword: false,
  resetPasswordFailed: false,
  refreshToken: null,
  accessToken: null
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        isAuthChecked: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        isAuthChecked: true,
        userFailed: false,
        refreshToken: action.refreshToken,
        accessToken: action.accessToken
      }
    }
    case AUTH_REQUEST_FAILED: {
      return {
        ...state,
        userFailed: true,
        isAuthChecked: true
      }
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: null,
        userFailed: false,
        isAuthChecked: true
      }
    }
    case POST_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPassword: true,
        forgotPasswordFailed: false
      }
    }
    case POST_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPassword: false,
        forgotPasswordFailed: true
      }
    }
    case POST_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: true,
        resetPasswordFailed: false
      }
    }
    case POST_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPassword: false,
        resetPasswordFailed: true
      }
    }

    default: {
      return state;
    }
  }
}
