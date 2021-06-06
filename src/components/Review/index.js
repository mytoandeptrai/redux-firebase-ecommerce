import "firebase/firestore";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addReviewStart } from "../../redux/Review/review.action";
import "./style.scss";
import firebase from "firebase/app";
import swal from "sweetalert";
const validate = (values) => {
  const errors = {};

  if (!values.comment) {
    errors.comment = "Vui lòng nhập đánh giá";
  } else if (values.comment.length < 10) {
    errors.comment = "Bình luận quá ngắn , phải lớn lơn 10 kí tự";
  }

  return errors;
};
const mapState = (state) => ({
  user: state.user.currentUser,
});
function Review({ productId }) {
  const dispatch = useDispatch();
  const { user } = useSelector(mapState);
  const history = useHistory();

  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validate,
    onSubmit: (values) => {
      if (user) {
        const data = {
          timeDate: new Date().toISOString(),
          user: user,
          star: rating.toString(),
          comment: values.comment,
        };
        const id = productId;
        dispatch(
          addReviewStart(
            { productRating: firebase.firestore.FieldValue.arrayUnion(data) },
            id
          )
        );
        formik.resetForm();
        setRating(null);
        swal("Cảm ơn bạn đã đóng góp ý kiến !");
      } else {
        history.push("/login");
        swal({
          button: false,
          text: "Đăng nhập để đánh giá sản phẩm",
          timer: 1000,
        });
      }

      // history.push('/');
    },
  });

  return (
    <div className="mt-5 pt-3">
      <div>
        <h3>Đánh giá sản phẩm</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group ">
          <label htmlFor="start">Chọn mức độ hài lòng</label>
          <div>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <>
                  <label>
                    <input
                      type="radio"
                      id="rating"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    ></input>
                    <FaStar
                      className="start"
                      color={
                        ratingValue <= (rating || hover) ? "#ffc107" : "#e4e5e9"
                      }
                      size={50}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                </>
              );
            })}
          </div>
        </div>
        <div className="form-group">
          <label className="title__form" htmlFor="comment">
            Viết bình luận
          </label>
          <br />
          <br />
          <textarea
            class="form-control"
            id="comment"
            rows={3}
            name="comment"
            placeholder="Viết đánh giá sản phẩm ...."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment ? (
            <div className="err">{formik.errors.comment}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!rating}>
          Đánh giá
        </button>
      </form>
    </div>
  );
}

export default Review;
