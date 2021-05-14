import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductEdit from "../../components/ProductEdit";
import { fetchProductStart } from "../../redux/Products/products.action";
import "./style.scss";
const mapState = (state) => ({
  product: state.productsData.product,
});
const ProductEdits = () => {
  // const { productID } = useParams();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProductStart(productID));
  // }, []);
  // const { product } = useSelector(mapState);
  return (
    <>
      <ProductEdit />
    </>
  );
};

export default ProductEdits;
