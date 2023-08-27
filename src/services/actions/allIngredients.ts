import { getIngredients } from '../../utils/BurgerApi';
import { IIngredient, IIngredientRes } from '../types/ingredients';
import { Dispatch } from 'redux';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

interface IGetItemsRequest {
 type: typeof GET_ITEMS_REQUEST;
}

interface IGetItemsSuccess {
  type: typeof GET_ITEMS_SUCCESS;
  items: IIngredient[];
}

interface IGetItemsFailed {
  type: typeof GET_ITEMS_FAILED;
}

export type TGetItemsActions = | IGetItemsRequest | IGetItemsSuccess | IGetItemsFailed;

export function getItems(): (dispatch: Dispatch<TGetItemsActions>) => void {
  return function (dispatch: Dispatch<TGetItemsActions>) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getIngredients()
      .then((res: IIngredientRes) => {
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
      .catch((err: Error) => {
        console.log(`Произошла ошибка: ${err}`);
        dispatch({
          type: GET_ITEMS_FAILED
        })
      })
  }
}
