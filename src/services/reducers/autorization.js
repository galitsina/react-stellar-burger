import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../actions/autorization';

const initialUserState = {
  user: null,
  userRequest: false,
  userFailed: false
}

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userRequest: false,
        userFailed: false
      }
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      }
    }
    default: {
      return state;
    }
  }
}
