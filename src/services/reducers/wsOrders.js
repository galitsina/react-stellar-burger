import { webSocketStatus } from '../../utils/WebSocketUtils';
import {LIVE_ORDER_WS_CONNECTING, LIVE_ORDER_WS_OPEN, LIVE_ORDER_WS_CLOSE, LIVE_ORDER_WS_MESSAGE, LIVE_ORDER_WS_ERROR } from '../actions/wsOrders';

const initialState = {
  status: webSocketStatus.OFFLINE,
  orders: [{
    ingredients: [
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0948",
      "643d69a5c3f7b9001cfa0946",
      "643d69a5c3f7b9001cfa0949"
    ],
    _id: "1",
    status: "done",
    number: 420,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa094a",
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0943",
      "643d69a5c3f7b9001cfa0946",
      "643d69a5c3f7b9001cfa0949"
    ],
    _id: "2",
    status: "done",
    number: 481,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa094a",
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0943",
      "643d69a5c3f7b9001cfa0946",
      "643d69a5c3f7b9001cfa0949",
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa094a",
      "643d69a5c3f7b9001cfa093d",
      "643d69a5c3f7b9001cfa0943",
    ],
    _id: "2",
    status: "done",
    number: 422,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  },
  {
    ingredients: [
      "643d69a5c3f7b9001cfa0943",
    ],
    _id: "2",
    status: "done",
    number: 540,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  }
],

  connectingError: ''
}

export const wsOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIVE_ORDER_WS_CONNECTING: {
      return {
        ...state,
        status: webSocketStatus.CONNECTING
      }
    }
    case LIVE_ORDER_WS_OPEN: {
      return {
        ...state,
        status: webSocketStatus.ONLINE,
        connectingError: ''
      }
    }
    case LIVE_ORDER_WS_CLOSE: {
      return {
        ...state,
        status: webSocketStatus.OFFLINE,
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

      }
    }

    default: {
      return state;
    }
  }
}
