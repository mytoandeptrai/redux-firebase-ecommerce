import React from "react";
import "./style.scss";
const Star = ({ product }) => {
  const producStar = () => {
    let numArr = [];
    let numberStar;

    if (product?.productRating === undefined || !product?.productRating) {
      return "Không có đánh giá";
    }

    if (product.productRating.length > 0) {
      product?.productRating.map((e) => {
        numArr.push(parseInt(e.star));
      });
      numberStar = numArr.reduce((a, b) => a + b);
      let numCount = parseFloat(numberStar / numArr.length).toFixed(2);
      return (
        <>
          <h2>
            {numCount >= 1 && numCount < 2 ? (
              <>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
              </>
            ) : numCount >= 2 && numCount < 3 ? (
              <>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
              </>
            ) : numCount >= 3 && numCount < 4 ? (
              <>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
              </>
            ) : numCount >= 4 && numCount < 5 ? (
              <>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
              </>
            ) : (
              <>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
                <i class="fa fa-star starShow" aria-hidden="true"></i>
              </>
            )}
          </h2>
        </>
      );
    }
  };

  return <>{producStar()}</>;
};

export default Star;
