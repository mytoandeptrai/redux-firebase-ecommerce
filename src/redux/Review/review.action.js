import reviewsType from "./review.types";

export const addReviewStart = (productRating, id) => ({
  type: reviewsType.ADD_NEW_REVIEW_START,
  payload: productRating,
  id: id,
});

export const fetchReviewStart = (id) => ({
  type: reviewsType.FETCH_REVIEW_START,
  payload: id,
});

export const setReviews = (reviewData) => ({
  type: reviewsType.SET_REVIEW,
  payload: reviewData,
});
