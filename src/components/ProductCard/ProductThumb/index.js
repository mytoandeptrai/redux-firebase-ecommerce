import React from "react";

const ProductThumb = ({ productThumbnails, handleTab, myRef }) => {
  return (
    <div className="productThumb" ref={myRef}>
      {productThumbnails.map((img, index) => (
        <img src={img} alt="img" onClick={() => handleTab(index)} />
      ))}
    </div>
  );
};

export default ProductThumb;
