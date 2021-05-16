import React from "react";

const ProductSize = ({ productSizes }) => {
  return (
    <div className="productSize">
      {productSizes.map((size, index) => (
        <button>{size}</button>
      ))}
    </div>
  );
};

export default ProductSize;
