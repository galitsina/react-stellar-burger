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

export const getAllIngredients = (state) => state.allIngredients;
export const getAuthChecked = (state) => state.user.isAuthChecked;
export const getOrderState = (state) => state.order;
export const getSelectedIngredients = (state) => state.selectedIngredients;
export const getWsOrders = (state) => state.wsOrders;

export const allOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
export const privateOrdersUrl = 'wss://norma.nomoreparties.space/orders';

export const WebsocketStatus  = {
  CONNECTING:  'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const statusName = (status) => {
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

export const colorStatus = (status) => {
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
