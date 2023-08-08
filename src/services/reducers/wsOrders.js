import { WebsocketStatus } from '../../utils/Data';
import {LIVE_ORDER_WS_CONNECTING, LIVE_ORDER_WS_OPEN, LIVE_ORDER_WS_CLOSE, LIVE_ORDER_WS_MESSAGE, LIVE_ORDER_WS_ERROR } from '../actions/wsOrders';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  wsOrders: [],
  connectingError: ''
}

export const wsOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIVE_ORDER_WS_CONNECTING: {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING
      }
    }
    case LIVE_ORDER_WS_OPEN: {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: ''
      }
    }
    case LIVE_ORDER_WS_CLOSE: {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      }
    }
    case LIVE_ORDER_WS_ERROR: {
      return {
        ...state,
        connectingError: action.payload
      }
    }
    case LIVE_ORDER_WS_MESSAGE: {
      return {
        ...state,
        wsOrders: action.payload
      }
    }
    default: {
      return state;
    }
  }
}
