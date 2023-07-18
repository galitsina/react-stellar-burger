import { combineReducers } from 'redux';
import { allIngredientsReducer } from './allIngredients';
import { selectedIngredientsReducer } from './selectedIngredients';
import { currentIngredientReducer } from './currentIngredient';
import { orderReducer} from './order';
import { userReducer} from './autorization';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userReducer
});
