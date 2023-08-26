import { combineReducers } from 'redux';
import { allIngredientsReducer } from './allIngredients';
import { selectedIngredientsReducer } from './selectedIngredients';
import { currentIngredientReducer } from './currentIngredient';
import { orderReducer} from './order';
import { userReducer} from './autorization';
import { wsOrdersReducer } from './wsOrders';

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  selectedIngredients: selectedIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  user: userReducer,
  wsOrders: wsOrdersReducer
});

