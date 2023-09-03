import {
  ADD_INGREDIENT,
  ADD_BUN,
  DECREASE_INGREDIENT,
  CLEAR_ITEMS,
  MOVE_ITEMS
} from '../actions/selectedIngredients';
import { IIngredient } from '../types/ingredients';
import { TSelectedIngredientsActions } from '../actions/selectedIngredients';

interface ISelectedItemsState {
  selectedItems: IIngredient[];
  bun: IIngredient | null;
}
const initialSelectedState: ISelectedItemsState = {
  selectedItems: [],
  bun: null
}

export const selectedIngredientsReducer = (state: ISelectedItemsState = initialSelectedState, action: TSelectedIngredientsActions):ISelectedItemsState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const addedArr = [...state.selectedItems]
      addedArr.push(action.ingredient);
      return {
        ...state,
        selectedItems: addedArr
      };
    }
    //при вызове dispatch в action положить type и item из карточки ингредиента, имя - ingredient: action.ingredient - лежит {}
    case ADD_BUN: {
      //take bun, drop it to constructor, rewrite state.bun to action.ingredirnt
      return {
        ...state,
        bun: action.bun
      };
    }
    case DECREASE_INGREDIENT: {
      const decreasedArr = [...state.selectedItems].filter(item => item.key !== action.ingredient.key)
      return {
        ...state,
        selectedItems: decreasedArr
      };
    }
    case CLEAR_ITEMS: {
      return {
        ...state,
        selectedItems: [],
        bun: null
      }
    }
    case MOVE_ITEMS: {
      const dragItem = state.selectedItems[action.dragIndex];
      const newItems = [...state.selectedItems];
      newItems.splice(action.dragIndex, 1);
      newItems.splice(action.hoverIndex, 0, dragItem);
      return {
        ...state,
        selectedItems: newItems
      }
    }
    default: {
      return state;
    }
  }
};
