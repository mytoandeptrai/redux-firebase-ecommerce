import ordersTypes from "./order.types";
import { takeLatest, call, put, all } from "redux-saga/effects";
import {
  handleGetOrder,
  handleGetUserOrderHistory,
  handleSaveOrder,
} from "./order.helper";
import { auth } from "../../firebase/utils";
import { clearCart } from "../Cart/cart.actions";
import { setOrderDetails, setUserOrderHistory } from "./order.actions";
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

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
