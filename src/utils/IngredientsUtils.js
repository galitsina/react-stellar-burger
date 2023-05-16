export const splitIngredients = (data) => {
  const buns = [];
  const sauces = [];
  const fillings = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'bun') {
      buns.push(data[i]);
    } else if (data[i].type === 'sauce') {
      sauces.push(data[i]);
    } else if (data[i].type === 'main') {
      fillings.push(data[i]);
    }
  }

  const ingredients = {
    buns: buns,
    sauces: sauces,
    fillings: fillings
  }
  return ingredients;
}
