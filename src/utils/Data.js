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
export const routeOrderId = "/:orderId";

export const getAllIngredients = (state) => state.allIngredients;
export const getAuthChecked = (state) => state.user.isAuthChecked;
export const getOrderState = (state) => state.order;
export const getSelectedIngredients = (state) => state.selectedIngredients;
