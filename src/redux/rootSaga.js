import { all, call } from "redux-saga/effects";
import userSagas from "./User/user.saga";
import productsSagas from "./Products//products.saga";
export default function* rootSaga() {
  yield all([call(userSagas), call(productsSagas)]);
}
