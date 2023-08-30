import { IWSOrdersRes } from '../types/order';

export const LIVE_ORDER_CONNECT: 'LIVE_ORDER_CONNECT' = 'LIVE_ORDER_CONNECT';
export const LIVE_ORDER_DISCONNECT: 'LIVE_ORDER_DISCONNECT' = 'LIVE_ORDER_DISCONNECT';
export const LIVE_ORDER_WS_CONNECTING: 'LIVE_ORDER_WS_CONNECTING' = 'LIVE_ORDER_WS_CONNECTING';
export const LIVE_ORDER_WS_OPEN: 'LIVE_ORDER_WS_OPEN' = 'LIVE_ORDER_WS_OPEN';
export const LIVE_ORDER_WS_CLOSE: 'LIVE_ORDER_WS_CLOSE' = 'LIVE_ORDER_WS_CLOSE';
export const LIVE_ORDER_WS_MESSAGE: 'LIVE_ORDER_WS_MESSAGE' = 'LIVE_ORDER_WS_MESSAGE';
export const LIVE_ORDER_WS_ERROR: 'LIVE_ORDER_WS_ERROR' = 'LIVE_ORDER_WS_ERROR';

interface ILiveOrderConnect {
  type: typeof LIVE_ORDER_CONNECT;
  payload: string;
}

interface ILiveOrderDisonnect {
  type: typeof LIVE_ORDER_DISCONNECT;
}

interface ILiveOrderWSConnecting {
  type: typeof LIVE_ORDER_WS_CONNECTING;
}

interface ILiveOrderWSOpen {
  type: typeof LIVE_ORDER_WS_OPEN;
}

interface ILiveOrderWSClose {
  type: typeof LIVE_ORDER_WS_CLOSE;
}

interface ILiveOrderWSMessage {
  type: typeof LIVE_ORDER_WS_MESSAGE;
  payload: IWSOrdersRes;
}

interface ILiveOrderWSError {
  type: typeof LIVE_ORDER_WS_ERROR;
  payload: string;
}

export type TWSOrdersActions = ILiveOrderConnect | ILiveOrderDisonnect | ILiveOrderWSConnecting | ILiveOrderWSOpen | ILiveOrderWSClose | ILiveOrderWSMessage | ILiveOrderWSError;

export const connect = (url: string) => ({
  type: LIVE_ORDER_CONNECT,
  payload: url
});

export const disconnect = () => ({
  type: LIVE_ORDER_DISCONNECT
});

export type TWSActions = {
  wsConnect: typeof LIVE_ORDER_CONNECT,
  wsDisconnect: typeof LIVE_ORDER_DISCONNECT,
  wsConnecting: typeof LIVE_ORDER_WS_CONNECTING,
  onOpen: typeof LIVE_ORDER_WS_OPEN,
  onClose: typeof LIVE_ORDER_WS_CLOSE,
  onMessage: typeof LIVE_ORDER_WS_MESSAGE,
  onError: typeof LIVE_ORDER_WS_ERROR
};
