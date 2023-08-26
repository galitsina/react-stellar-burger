import { rootReducer } from '../reducers/rootReducer';
import { TGetItemsActions } from '../actions/allIngredients';

import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type RootState = ReturnType<typeof rootReducer>
export type TApplicationActions = TGetItemsActions ;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = typeof rootReducer;
