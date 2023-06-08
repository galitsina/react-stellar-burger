const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getIngredients = () => {
  return fetch(`${BURGER_API_URL}/ingredients`)
    .then(checkResponse)
}

export const sendOrder = (idArr) => {
  return fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa093e"]
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
    .then(checkResponse)
}

