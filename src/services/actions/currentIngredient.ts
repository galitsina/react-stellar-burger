import { IIngredient } from '../types/ingredients';
export const CURRENT_ITEM: 'CURRENT_ITEM' = 'CURRENT_ITEM';
export const CLEAR_CURRENT_ITEM: 'CLEAR_CURRENT_ITEM' = 'CLEAR_CURRENT_ITEM';

interface ICurrentItem {
  type: typeof CURRENT_ITEM;
  currentItem: IIngredient;
}

interface IClearCurrentItem {
  type: typeof CLEAR_CURRENT_ITEM;
  currentItem: IIngredient;
}

export type TCurrentItemActions = ICurrentItem | IClearCurrentItem;
