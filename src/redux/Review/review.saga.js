import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchReviewStart, setReviews } from "./review.action";
import { handleAddNewReview, handleFetchReviews } from "./review.helper";
import reviewsType from "./review.types";

export function* addNewReview({ payload, id }) {
  try {
    yield handleAddNewReview(payload, id);
    yield put(fetchReviewStart(id));
  } catch (error) {
    console.log(error);
  }
}
export function* onAddReviewStart() {
  yield takeLatest(reviewsType.ADD_NEW_REVIEW_START, addNewReview);
}

export function* fetchReview({ payload }) {
  try {
    const listReview = yield handleFetchReviews(payload);
    yield put(setReviews(listReview));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchReviewsStart() {
  yield takeLatest(reviewsType.FETCH_REVIEW_START, fetchReview);
}

export default function* reviewsSagas() {
  yield all([call(onAddReviewStart), call(onFetchReviewsStart)]);
}
