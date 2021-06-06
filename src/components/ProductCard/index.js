import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  addProduct,
  addProductFromDetail,
} from "../../redux/Cart/cart.actions";
import {
  fetchProductsStart,
  fetchProductStart,
  productDetailSucces,
  setProduct,
} from "../../redux/Products/products.action";
import Button from "../forms/Button";
import ProductSize from "./ProductSize";
import ProductThumb from "./ProductThumb";
import "./style.scss";
import Star from "../Star";
import Review from "../Review";
import Rate from "../Rate";
const mapState = (state) => ({
  product: state.productsData.product,
  loadingDetail: state.productsData.loadingDetail,
});
const ProductCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productID } = useParams();
  const { product, loadingDetail } = useSelector(mapState);
  const {
    productName,
    productPrice,
    productDesc,
    productCount,
    productRating,
  } = product;
  const myRef = createRef();
  const [index, setIndex] = useState(0);
  const [formValue, setFormValue] = useState({
    quantity: 1,
    size: "",
    product: {},
  });

  useEffect(() => {
    dispatch(fetchProductStart(productID));
    // return () => {
    //   dispatch(setProduct({}));
    // };
  }, []);

  const handleAddClick = () => {
    setFormValue({
      ...formValue,
      quantity: formValue.quantity + 1,
    });
  };

  const handleRemoveClick = () => {
    if (formValue.quantity <= 1) {
      return;
    } else {
      setFormValue({
        ...formValue,
        quantity: formValue.quantity - 1,
      });
    }
  };

  const resetForm = () => {
    setFormValue({
      quantity: 1,
      size: "",
      product: {},
    });
  };

  const handleAddToCartFromDetail = (product) => {
    if (!formValue.size || !formValue.quantity) {
      alert("You need to choose your size and your number");
    } else {
      const newValue = { ...formValue, product };
      console.log(newValue);
      dispatch(addProductFromDetail(newValue));
      history.push("/cart");
      resetForm();
    }
  };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
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
              <Review productId={productID} />
            </div>
            <div className="productDetails">
              <div className="productContent">
                <h2>{productName}</h2>
                <span>${productPrice}</span>
              </div>
              <div className="productStar">
                <Star product={product} />
              </div>
              <div className="productSize">
                {product.productSizes.map((size, index) => (
                  <ProductSize
                    sizeValue={formValue.size}
                    size={size}
                    handleChange={handleChange}
                  />
                ))}
              </div>
              {productDesc ? (
                <span dangerouslySetInnerHTML={{ __html: productDesc }} />
              ) : (
                ""
              )}
              <div className="productActions">
                <button onClick={handleRemoveClick}>-</button>
                <input
                  type="number"
                  value={formValue.quantity}
                  name="quantity"
                  onChange={handleChange}
                />
                {/* {formValue.quantity} */}
                <button onClick={handleAddClick}>+</button>
              </div>
              <ProductThumb
                myRef={myRef}
                productThumbnails={product.productThumbnails}
                handleTab={handleTab}
              />
              <div className="addToCart">
                <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCartFromDetail(product)}
                >
                  {" "}
                  Add to Cart
                </Button>
              </div>
              <div className="productRating">
                <Rate id={productID} />
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
