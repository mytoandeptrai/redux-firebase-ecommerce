import reviewsType from "./review.types";

const INITIAL_STATE = {
  listReview: [],
};
const reviewsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case reviewsType.SET_REVIEW:
      return {
        ...state,
        listReview: action.payload,
      };
    default:
      return state;
  }
};
export default reviewsReducer;
