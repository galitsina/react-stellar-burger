import { IIngredient } from '../types/ingredients';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const DECREASE_INGREDIENT: 'DECREASE_INGREDIENT' = 'DECREASE_INGREDIENT';
export const CLEAR_ITEMS: 'CLEAR_ITEMS' = 'CLEAR_ITEMS';
export const MOVE_ITEMS: 'MOVE_ITEMS' = 'MOVE_ITEMS';

interface IAddIngredient {
  type: typeof ADD_INGREDIENT;
  ingredient: IIngredient;
}

interface IAddBun {
  type: typeof ADD_BUN;
  bun: IIngredient;
}

interface IDecreaseIngredient {
  type: typeof DECREASE_INGREDIENT;
  ingredient: IIngredient;
}

interface IClearItems{
  type: typeof CLEAR_ITEMS;
  bun: IIngredient;
}

interface IMoveItems {
  type: typeof MOVE_ITEMS;
  dragIndex: number;
  hoverIndex: number;
}
export type TSelectedIngredientsActions = IAddIngredient | IAddBun | IDecreaseIngredient | IClearItems | IMoveItems;
