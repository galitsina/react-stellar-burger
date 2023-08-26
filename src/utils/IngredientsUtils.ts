import { IIngredient, TIngredientId } from '../services/types/ingredients';

interface IIngredients {
  buns: IIngredient[],
  sauces: IIngredient[],
  fillings: IIngredient[]
}

export const splitIngredients = (data: IIngredient[]): IIngredients => {
  const buns: IIngredient[] = [];
  const sauces: IIngredient[] = [];
  const fillings: IIngredient[] = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'bun') {
      buns.push(data[i]);
    } else if (data[i].type === 'sauce') {
      sauces.push(data[i]);
    } else if (data[i].type === 'main') {
      fillings.push(data[i]);
    }
  }

  const ingredients: IIngredients = {
    buns: buns,
    sauces: sauces,
    fillings: fillings
  }
  return ingredients;
}

export const findItemsInOrder = (ingredientsInOrder: string[], allIngredients: []): IIngredient[] => {
  return ingredientsInOrder.reduce((prevValue: IIngredient[], ingredientInOrder: string) => {
    const ingredientDetails = allIngredients.find((ingredientInAll: { _id: TIngredientId }) => {
      return ingredientInAll._id === ingredientInOrder;
    })
    if (ingredientDetails) {
      prevValue.push(ingredientDetails)
    }
    return prevValue
  }, [])
}
