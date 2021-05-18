import React from "react";

const ProductSize = ({ size, sizeValue, handleChange }) => {
  return (
    <>
      <input
        type="radio"
        name="size"
        value={size}
        checked={sizeValue === size}
        onChange={handleChange}
        id="inputValue"
      />
      {size}
    </>
  );
};

export default ProductSize;
