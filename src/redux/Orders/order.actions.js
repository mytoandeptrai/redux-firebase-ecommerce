import ordersTypes from "./order.types";

export const saveOrderHistory = (order) => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order,
});

export const getUserOrderHistory = (uid) => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid,
});

export const setUserOrderHistory = (history) => ({
  type: ordersTypes.SET_USER_ORDER_HISTORY,
  payload: history,
});

export const getOrderDetailsStart = (orderID) => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  payload: orderID,
});

export const setOrderDetails = (order) => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  payload: order,
});

export const deleteOrders = (orderID) => ({
  type: ordersTypes.DELETE_ORDER_START,
  payload: orderID,
});

export const fetchOrdersStart = () => ({
  type: ordersTypes.FETCH_ORDER_START,
});

export const setOrders = (orders) => ({
  type: ordersTypes.SET_ORDERS,
  payload: orders,
});

export const updateShippingOrder = (orderID) => ({
  type: ordersTypes.UPDATE_SHIPPING_ORDER_START,
  payload: orderID,
});

