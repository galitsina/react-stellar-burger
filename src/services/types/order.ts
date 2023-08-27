import { IIngredient, TIngredientId } from "./ingredients";

export interface IOwner {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  createdAt: string;
  ingredients: IIngredient[];
  name: string;
  number: number;
  owner: IOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderRes {
  name: string;
  success: boolean;
  order: IOrder;
}

export interface ISingleOrder {
  createdAt: string;
  ingredients: TIngredientId[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface ISingleOrderRes {
  orders: ISingleOrder[];
  success: boolean;
}

export interface IWSOrder {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}
export interface IWSOrdersRes {
  success: boolean;
  orders: IWSOrder[];
  total: number;
  totalToday: number;

}
