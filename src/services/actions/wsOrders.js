export const LIVE_ORDER_CONNECT = 'LIVE_ORDER_CONNECT';
export const LIVE_ORDER_DISCONNECT = 'LIVE_ORDER_DISCONNECT';
export const LIVE_ORDER_WS_CONNECTING = 'LIVE_ORDER_WS_CONNECTING';
export const LIVE_ORDER_WS_OPEN = 'LIVE_ORDER_WS_OPEN';
export const LIVE_ORDER_WS_CLOSE = 'LIVE_ORDER_WS_CLOSE';
export const LIVE_ORDER_WS_MESSAGE = 'LIVE_ORDER_WS_MESSAGE';
export const LIVE_ORDER_WS_ERROR = 'LIVE_ORDER_WS_ERROR';

export const connect = (url) => ({
  type: LIVE_ORDER_CONNECT,
  payload: url
});

export const disconnect = () => ({
  type: LIVE_ORDER_DISCONNECT
});




