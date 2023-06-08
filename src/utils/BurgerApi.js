const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const request = (endpoint, options) => {
  return fetch(`${BURGER_API_URL}/${endpoint}`, options).then(checkResponse)
}

export const getIngredients = () => {
  return request('ingredients', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const sendOrder = (ids) => {
  return request('orders', {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ids
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

