import { combineReducers } from 'redux';
import { allIngredientsReducer, selectedIngredientsReducer, currentIngredientReducer, orderReducer} from './index';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer
});
