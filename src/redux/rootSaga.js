import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.saga";
import productsSagas from "./Products//products.saga";
import ordersSagas from "./Orders/order.saga";
import contactSagas from "./Contact/contact.saga";
export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(productsSagas),
    call(ordersSagas),
    call(contactSagas),
  ]);
}
