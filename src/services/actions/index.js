import { getIngredients, sendOrder } from '../../utils/BurgerApi';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const DECREASE_INGREDIENT = 'DECREASE_INGREDIENT';
export const CLEAR_ITEMS = 'CLEAR_ITEMS';
export const MOVE_ITEMS = 'MOVE_ITEMS';

export const CURRENT_ITEM = 'CURRENT_ITEM';
export const CLEAR_CURRENT_ITEM = 'CLEAR_CURRENT_ITEM';

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            items: res.data
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: GET_ITEMS_FAILED
        })
      })
  }
}

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
