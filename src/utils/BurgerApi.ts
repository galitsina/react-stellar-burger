import { IIngredientRes } from '../services/types/ingredients';
import { IOrderRes, ISingleOrderRes } from '../services/types/order';
import { IPasswordRes, ILoginRes, ILogoutRes, IUserData, IRefreshData, IGetUserDataRes } from '../services/types/autorization';
const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const request = <T>(endpoint: string, options: RequestInit): Promise<T> => {
  return fetch(`${BURGER_API_URL}/${endpoint}`, options)
  .then(checkResponse<T>)
}

export const fetchWithRefresh = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
  try {
    const res = await fetch(`${BURGER_API_URL}/${endpoint}`, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken() ; //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      //options.headers!.authorization = refreshData.accessToken;
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${refreshData.accessToken}`,
      };
      const res = await fetch(`${BURGER_API_URL}/${endpoint}`, options); //повторяем запрос
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
}

export const getIngredients = (): Promise<IIngredientRes> => {
  return request('ingredients', {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const sendOrder = (ids: string[]): Promise<IOrderRes> => {
  return request('orders', {
    method: 'POST',
    body: JSON.stringify({
      ingredients: ids
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: localStorage.getItem('accessToken')!
    }
  })
}

export const forgotPassword = (value: string): Promise<IPasswordRes> => {
  return request('password-reset', {
    method: 'POST',
    body: JSON.stringify({
      "email": value
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const resetPassword = (password: string, token: string): Promise<IPasswordRes> => {
  return request('password-reset/reset', {
    method: 'POST',
    body: JSON.stringify({
      "password": password,
      "token": token
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const createUserRequest = ({email, password, name}: IUserData): Promise<ILoginRes> => {
  return request('auth/register', {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
      "name": name
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const login = ({email, password}: IUserData): Promise<ILoginRes> => {
  return request('auth/login', {
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

//Для выхода из системы или обновления токена используется именно refreshToken
export const logout = (): Promise<ILogoutRes> => {
  return request('auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const refreshToken = (): Promise<IRefreshData> => {
  return request('auth/token', {
    method: 'POST',
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export const getUserRequest = (): Promise<IGetUserDataRes> => {
  return fetchWithRefresh('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: localStorage.getItem('accessToken')!
    }
  })
}

export const updateUser = ({name, email, password}: IUserData): Promise<IGetUserDataRes> => {
  return fetchWithRefresh('auth/user', {
    method: 'PATCH',
    body: JSON.stringify({
        "email": email,
        "name": name,
        "password": password
    }),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      authorization: localStorage.getItem('accessToken')!
    }
  })
}

export const getOrderDetails = (orderNumber: string): Promise<ISingleOrderRes> => {
  return request(`orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}
