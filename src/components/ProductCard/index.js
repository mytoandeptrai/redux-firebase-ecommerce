import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addProduct } from "../../redux/Cart/cart.actions";
import {
  fetchProductsStart,
  fetchProductStart,
  setProduct,
} from "../../redux/Products/products.action";
import Button from "../forms/Button";
import ProductSize from "./ProductSize";
import ProductThumb from "./ProductThumb";
import "./style.scss";

const mapState = (state) => ({
  product: state.productsData.product,
  loadingDetail: state.productsData.loadingDetail,
});
const ProductCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product, loadingDetail } = useSelector(mapState);
  const { productName, productPrice, productDesc, productCount } = product;
  const myRef = createRef();
  const [index, setIndex] = useState(0);
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

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;
    for (let index = 0; index < images.length; index++) {
      images[index].className = images[index].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const configAddToCartBtn = {
    type: "button",
  };
  return (
    <>
      {loadingDetail === false ? (
        <>
          {" "}
          <div className="productCard">
            <div className="hero">
              <img src={product.productThumbnails[index]} alt={productName} />
            </div>
            <div className="productDetails">
              <div className="productContent">
                <h2>{productName}</h2>
                <span>${productPrice}</span>
              </div>
              <ProductSize productSizes={product.productSizes} />
              {productDesc ? (
                <span dangerouslySetInnerHTML={{ __html: productDesc }} />
              ) : (
                ""
              )}
              <div className="productAction">
                <p>Count: {productCount}</p>
              </div>
              <ProductThumb
                myRef={myRef}
                productThumbnails={product.productThumbnails}
                handleTab={handleTab}
              />
              <div className="addToCart">
                <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  {" "}
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          <p>loadingDetail</p>{" "}
        </>
      )}
    </>
  );
};

export default ProductCard;
