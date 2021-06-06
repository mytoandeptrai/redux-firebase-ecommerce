import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewStart } from "../../redux/Review/review.action";
import "./style.scss";
const Rate = ({ id }) => {
  const reviewData = useSelector((state) => state.reviewsData.listReview);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviewStart(id));
  }, []);

  const showRating = () => {
    if (reviewData?.productRating === undefined || !reviewData?.productRating) {
      return "Không có đánh giá";
    }
    if (reviewData.productRating.length > 0) {
      return (
        <>
          {reviewData?.productRating ? (
            <>
              <div className="productEvaluates">
                <h1>Evaluates</h1>
                {reviewData.productRating.map((review, id) => {
                  return (
                    <>
                      <div className="productInfo" key={id}>
                        <div className="image">
                          <img
                            src={review.user.image}
                            alt="Profile"
                            width="50"
                            height="50"
                          />
                        </div>
                        <div className="comment">
                          <h4>{review.user.displayName} :</h4>
                          <p>{review.comment}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <> </>
          )}
        </>
      );
    }
  };
  return (
    <>
      {/* {reviewData.productRating.length === 0 ? (
        "Chua co danh gia"
      ) : (
        <>
          <div>
            {reviewData.productRating.map((review) => (
              <p>{review.comment}</p>
            ))}
          </div>
        </>
      )} */}
      {showRating()}
    </>
  );
};

export default Rate;
