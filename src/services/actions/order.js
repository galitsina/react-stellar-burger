import { sendOrder, getOrderDetails } from '../../utils/BurgerApi';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function getOrder(ids) {
  return function (dispatch) {
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
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: SEND_ORDER_FAILED
        })
      })
  }
}

export function getSingleOrderDetails(id){
  return function (dispatch) {
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
      .catch((err) => {
        dispatch({type: SEND_ORDER_FAILED})
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}

