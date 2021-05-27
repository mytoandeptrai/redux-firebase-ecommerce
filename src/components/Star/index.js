import React from "react";

const Star = ({ rating }) => {
  const producStar = () => {
    let numArr = [];
    let numberStar;

    if (rating.length <= 0) {
      return "Không có đánh giá";
    }

    if (rating.length > 0) {
      rating.map((e) => {
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
