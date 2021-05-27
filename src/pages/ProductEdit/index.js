import React from "react";
import ProductEdit from "../../components/ProductEdit";
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
