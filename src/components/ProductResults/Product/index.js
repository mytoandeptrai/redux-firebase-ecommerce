import React from "react";
import Button from "../../forms/Button";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/Cart/cart.actions";
import Star from "../../Star";
const Product = (product) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    productThumbnails,
    productName,
    productPrice,
    documentId,
    productDiscount,
    productRating,
  } = product;
  if (
    !documentId ||
    !productThumbnails ||
    !productName ||
    typeof productPrice === "undefined"
  )
    return null;
  const configAddToCartBtn = {
    type: "button",
  };
  const handleAddToCart = (product) => {
    if (!product) return;
    console.log(product);
    dispatch(addProduct(product));
    // history.push("/cart");
  };
  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentId}`}>
          <img src={productThumbnails[0]} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentId}`}>{productName}</Link>
            </span>
          </li>
          <li>{/* <Star product={product} /> */}</li>
          <li>
            <div className="productPrice">
              <span className="price">${productPrice}</span>
              <span className="discount">${productDiscount}</span>
            </div>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
