import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/rootReducer';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { configureStore } from "@reduxjs/toolkit";
import {
  LIVE_ORDER_CONNECT,
  LIVE_ORDER_DISCONNECT,
  LIVE_ORDER_WS_CONNECTING,
  LIVE_ORDER_WS_OPEN,
  LIVE_ORDER_WS_CLOSE,
  LIVE_ORDER_WS_MESSAGE,
  LIVE_ORDER_WS_ERROR
} from './services/actions/wsOrders';

const wsActions = socketMiddleware({
  wsConnect: LIVE_ORDER_CONNECT,
  wsDisconnect: LIVE_ORDER_DISCONNECT,
  wsConnecting: LIVE_ORDER_WS_CONNECTING,
  onOpen: LIVE_ORDER_WS_OPEN,
  onClose: LIVE_ORDER_WS_CLOSE,
  onMessage: LIVE_ORDER_WS_MESSAGE,
  onError: LIVE_ORDER_WS_ERROR
});

const composeEnhancers =
  typeof window === 'object' && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk, wsActions));
// const store = createStore(rootReducer, enhancer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsActions);
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
