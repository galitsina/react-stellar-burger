import { IIngredient } from '../types/ingredients';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  TGetItemsActions
} from '../actions/allIngredients';

interface IItemsState {
  items: IIngredient[];
  itemsRequest: boolean,
  itemsFailed: boolean
}
const initialItemsState: IItemsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
}

export const allIngredientsReducer = (state: IItemsState = initialItemsState, action: TGetItemsActions): IItemsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        items: action.items,
        itemsRequest: false
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false
      };
    }
    default: {
      return state;
    }
  }
};




