import { all, call, put, takeLatest } from "redux-saga/effects";
import { handleSaveContact } from "./contact.helper";
import contactTypes from "./contact.types";

export function* saveContact({ payload }) {
  try {
    const timestamps = new Date().toDateString();
    yield handleSaveContact({
      ...payload,
      contactCreatedDate: timestamps,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* onSaveContactStart() {
  yield takeLatest(contactTypes.SAVE_CONTACT_START, saveContact);
}

export default function* contactSagas() {
  yield all([call(onSaveContactStart)]);
}
