import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  ADD_INGREDIENT,
  ADD_BUN,
  DECREASE_INGREDIENT,
  CURRENT_ITEM,
  CLEAR_CURRENT_ITEM,
  CLEAR_ITEMS
} from '../actions/index';

const initialItemsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
}

export const allIngredientsReducer = (state = initialItemsState, action) => {
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

const initialOrderState = {
  orderNumber: 0,
  orderRequest: false,
  orderFailed: false
}
export const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.orderNumber,
        orderRequest: false
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true,
        orderRequest: false
      };
    }
    default: {
      return state;
    }
  }
};

const initialSelectedState = {
  selectedItems: [],
  bun: null
}

export const selectedIngredientsReducer = (state = initialSelectedState, action) => {
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
    default: {
      return state;
    }
  }
};

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
