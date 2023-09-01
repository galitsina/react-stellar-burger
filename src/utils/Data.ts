import { rootReducer } from '../services/reducers/rootReducer';
import { RootState } from '../services/types/index';

export const routeMain = "/";
export const routeLogin = "/login";
export const routeRegister = "/register";
export const routeForgotPassword = "/forgot-password";
export const routeResetPassword = "/reset-password";
export const routeIngredients = "/ingredients";
export const routeIngredientId = "/:ingredientId";
export const routeProfile = "/profile";
export const route404 = "*";
export const routeFeed = "/feed";
export const routeFeedId = "/:feedId";
export const routeOrdersHistory = "/orders";

export const getAllIngredients = (state: RootState) => state.allIngredients;
export const getAuthChecked = (state: RootState) => state.user.isAuthChecked;
export const getOrderState = (state: RootState) => state.order;
export const getSelectedIngredients = (state: RootState) => state.selectedIngredients;
export const getUserState = (state: RootState) => state.user;
export const getWsOrders = (state: RootState) => state.wsOrders;

export const allOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
export const privateOrdersUrl = 'wss://norma.nomoreparties.space/orders';

export const WebsocketStatus  = {
  CONNECTING:  'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const statusName = (status: string) => {
  switch (status) {
    case 'done': {
      return 'Выполнен';
    };
    case 'cancelled': {
      return 'Отменен'
    }
    case 'pending': {
      return 'Готовится'
    }
    case 'created': {
      return 'Создан'
    }
    default: {
      return 'Статуса нет'
    }
  }
}

export const colorStatus = (status: string) => {
  switch (status) {
    case 'done': {
      return '#00CCCC';
    };
    case 'cancelled': {
      return '#FF0000'
    }
    default: {
      return '#F2F2F3'
    }
  }
}
