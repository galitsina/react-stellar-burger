import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  GET_ORDER_DETAILS_SUCCESS
} from '../actions/order';
import {TOrderActions} from '../actions/order';
import { ISingleOrder } from '../types/order';

interface IOrderState {
  orderNumber: number;
  orderRequest: boolean;
  orderFailed: boolean;
  singleOrderDetails: ISingleOrder | null;
}
const initialOrderState: IOrderState = {
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false,
  singleOrderDetails: null
}

export const orderReducer = (state: IOrderState = initialOrderState, action: TOrderActions): IOrderState => {
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
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderRequest: false,
        singleOrderDetails: action.singleOrderDetails
      }
    }
    default: {
      return state;
    }
  }
};
