import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Star from "../Star";
import "./style.scss";
const ProductRelative = () => {
  const productRelative = useSelector(
    (state) => state.productsData.productRelative
  );
  return (
    <>
      <div className="productRelatives">
        <h2>Produce Relative</h2>
        {productRelative.map((product, pos) => {
          return (
            <div className="productInfo" key={pos}>
              <div className="thumb">
                <img src={product.productThumbnails[0]} alt="productThumnail" />
              </div>
              <Link to={`/product/${product.documentID}`}>
                <h4>{product.productName}</h4>
              </Link>
              <Star id={product.documentID} />
              <div className="productPrice">
                <p className="discount">${product.productDiscount}</p>
                <p className="price">${product.productPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductRelative;
