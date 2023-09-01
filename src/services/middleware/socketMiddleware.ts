import { TWSActions, TWSOrdersActions } from '../actions/wsOrders';
import { MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../types/index';

export const socketMiddleware  = (wsActions: TWSActions) => {

  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next: (action: TWSOrdersActions ) => void) => (action: TWSOrdersActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;
      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: 'Error' });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
};
