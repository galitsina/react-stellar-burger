import { sendOrder } from '../../utils/BurgerApi';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
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
