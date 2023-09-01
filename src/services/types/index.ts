import { rootReducer } from '../reducers/rootReducer';
import { TGetItemsActions } from '../actions/allIngredients';
import { TAuthActions } from '../actions/autorization';
import { TCurrentItemActions } from '../actions/currentIngredient';
import { TOrderActions } from '../actions/order';
import { TSelectedIngredientsActions } from '../actions/selectedIngredients';
import { TWSOrdersActions, TWSActions } from '../actions/wsOrders';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

export type RootState = ReturnType<typeof rootReducer>
export type TApplicationActions = TGetItemsActions | TAuthActions | TCurrentItemActions | TOrderActions | TSelectedIngredientsActions | TWSOrdersActions;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;

