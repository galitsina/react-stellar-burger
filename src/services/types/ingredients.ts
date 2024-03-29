export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  key?: string;
}

export interface IIngredientRes {
  success: boolean;
  data: IIngredient[];
}

export type TIngredientId = string;
