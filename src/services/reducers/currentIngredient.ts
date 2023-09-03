import { TCurrentItemActions } from '../actions/currentIngredient';
import { IIngredient } from '../types/ingredients';
import {
  CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
} from '../actions/currentIngredient';

interface ICurrentItem {
  currentItem: IIngredient | null;
}
const initialCurrentState: ICurrentItem = {
  currentItem: null
}
export const currentIngredientReducer = (state: ICurrentItem = initialCurrentState, action: TCurrentItemActions):ICurrentItem => {
  switch (action.type) {
    case CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.currentItem
      };
    }
    case CLEAR_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: null
      };
    }
    default: {
      return state;
    }
  }
};
