import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cart.actions";
import {
  fetchOrdersStart,

  setOrderDetails,
  setOrders,
  setUserOrderHistory
} from "./order.actions";
import {
  handleDeleteOrder,
  handleFetchOrder,

  handleGetOrder,
  handleGetUserOrderHistory,
  handleSaveOrder,
  handleUpdateOrderShipping
} from "./order.helper";
import ordersTypes from "./order.types";

export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (error) {
    console.log(error);
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrder({ payload }) {
  console.log(payload);
  try {
    const timestamps = new Date().toDateString();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
    yield put(clearCart());
  } catch (error) {
    console.log(error);
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);
    yield put(setOrderDetails(order));
  } catch (error) {
    console.log(error);
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export function* deleteOrder({ payload }) {
  try {
    yield handleDeleteOrder(payload);
    yield put(fetchOrdersStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onDeleteOrder() {
  yield takeLatest(ordersTypes.DELETE_ORDER_START, deleteOrder);
}

export function* fetchOrders() {
  try {
    const orders = yield handleFetchOrder();
    yield put(setOrders(orders));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchOrdersStart() {
  yield takeLatest(ordersTypes.FETCH_ORDER_START, fetchOrders);
}

export function* updateOrderShipping({ payload }) {
  try {
    yield handleUpdateOrderShipping(payload);
    yield put(fetchOrdersStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onUpdateOrderShipping() {
  yield takeLatest(
    ordersTypes.UPDATE_SHIPPING_ORDER_START,
    updateOrderShipping
  );
}


export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onDeleteOrder),
    call(onFetchOrdersStart),
    call(onUpdateOrderShipping),
  ]);
}
