import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED
} from '../actions/order';

const initialOrderState = {
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false
}

export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.orderNumber,
        orderRequest: false
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    default: {
      return state;
    }
  }
};
