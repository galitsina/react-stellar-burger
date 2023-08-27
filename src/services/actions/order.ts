import { sendOrder, getOrderDetails } from '../../utils/BurgerApi';
import { ISingleOrder } from '../types/order';
import { Dispatch } from 'redux';

export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const GET_ORDER_DETAILS_SUCCESS: 'GET_ORDER_DETAILS_SUCCESS' = 'GET_ORDER_DETAILS_SUCCESS';
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';

interface IOrderRequest {
  type: typeof SEND_ORDER_REQUEST;
}

interface IOrderSuccess {
  type: typeof SEND_ORDER_SUCCESS;
  orderNumber: number;
}

interface IOrderDetailsSuccess {
  type: typeof GET_ORDER_DETAILS_SUCCESS;
  singleOrderDetails: ISingleOrder;
}

interface IOrderFailed {
  type: typeof SEND_ORDER_FAILED;
}

export type TOrderActions = IOrderRequest | IOrderSuccess | IOrderDetailsSuccess | IOrderFailed;

export function getOrder(ids: string[]): (dispatch: Dispatch<TOrderActions>) => void {
  return function (dispatch: Dispatch<TOrderActions>) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });
    sendOrder(ids)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            orderNumber: res.order.number
          });
        } else {
          dispatch({
            type: SEND_ORDER_FAILED
          });
        }
      })
      .catch((err: Error) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: SEND_ORDER_FAILED
        })
      })
  }
}

export function getSingleOrderDetails(id: string): (dispatch: Dispatch<TOrderActions>) => void {
  return function (dispatch: Dispatch<TOrderActions>) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });
    getOrderDetails(id)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            singleOrderDetails: res.orders[0]
          });
        } else {
          dispatch({
            type: SEND_ORDER_FAILED
          });
        }
      })
      .catch((err: Error) => {
        dispatch({ type: SEND_ORDER_FAILED })
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}

