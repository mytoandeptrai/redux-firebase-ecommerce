import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addProduct } from "../../redux/Cart/cart.actions";
import {
  fetchProductsStart,
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.action";
import Button from "../forms/Button";
import "./style.scss";

const mapState = (state) => ({
  product: state.productsData.product,
});
const ProductCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  console.log(product);
  const { productName, productThumbnail, productPrice, productDesc } = product;
  useEffect(() => {
    dispatch(fetchProductStart(productID));
    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push("/cart");
  };

  const configAddToCartBtn = {
    type: "button",
  };
  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt={productName} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li>
            <span>${productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button
                {...configAddToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                {" "}
                Add to Cart
              </Button>
            </div>
          </li>
          <li>
            {productDesc ? (
              <span dangerouslySetInnerHTML={{ __html: productDesc }} />
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
