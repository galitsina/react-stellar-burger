import {
  CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
} from '../actions/currentIngredient';

const initialCurrentState = {
  currentItem: null
}
export const currentIngredientReducer = (state = initialCurrentState, action) => {
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
