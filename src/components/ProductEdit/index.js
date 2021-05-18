import CKEditor from "ckeditor4-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  editProductStart,
  fetchProductStart,
} from "../../redux/Products/products.action";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import "./style.scss";
const mapState = (state) => ({
  product: state.productsData.product,
  loadingDetail: state.productsData.loadingDetail,
});
const ProductEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product, loadingDetail } = useSelector(mapState);
  const { documentId } = product;
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState();
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productThumbnail2, setProductThumbnail2] = useState("");
  const [productThumbnail3, setProductThumbnail3] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [sizes, setSizes] = useState("");
  const [productDesc, setProductDesc] = useState();

  useEffect(() => {
    dispatch(fetchProductStart(productID));
  }, []);

  console.log(loadingDetail);

  useEffect(() => {
    if (loadingDetail === false) {
      setProductCategory(product.productCategory);
      setProductName(product.productName);
      setProductPrice(product.productPrice);
      setProductThumbnail(product.productThumbnails[0]);
      setProductThumbnail2(product.productThumbnails[1]);
      setProductThumbnail3(product.productThumbnails[2]);
      setSizes(product.productSizes.join(","));
      setProductDesc(product.productDesc);
    }
  }, [product]);

  // useEffect(() => {
  //   if(!product){
  //     return;
  //   }else{
  //     //...
  //   }
  // },[product])

  const resetForm = () => {
    setProductCategory("mens");
    setProductName("");
    setProductPrice(0);
    setProductThumbnail("");
    setProductDesc("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProductStart({
        productCategory,
        productName,
        productThumbnail,
        productThumbnail2,
        productThumbnail3,
        sizes,
        productPrice,
        productDesc,
        documentId,
      })
    );
    resetForm();
    history.push("/admin");
  };

  return (
    <>
      {loadingDetail === false ? (
        <>
          <div className="addNewProductForm">
            <form onSubmit={handleSubmit}>
              <h2>Edit product</h2>

              <FormSelect
                label="Category"
                options={[
                  {
                    value: "mens",
                    name: "Mens",
                  },
                  {
                    value: "womens",
                    name: "Womens",
                  },
                ]}
                handleChange={(e) => setProductCategory(e.target.value)}
              />

              <FormInput
                label="Name"
                type="text"
                value={productName}
                handleChange={(e) => setProductName(e.target.value)}
              />

              <FormInput
                label="Main image URL"
                type="url"
                value={productThumbnail}
                handleChange={(e) => setProductThumbnail(e.target.value)}
              />

              <FormInput
                label="Second image URL"
                type="url"
                value={productThumbnail2}
                handleChange={(e) => setProductThumbnail2(e.target.value)}
              />

              <FormInput
                label="Third image URL"
                type="url"
                value={productThumbnail3}
                handleChange={(e) => setProductThumbnail3(e.target.value)}
              />

              <FormInput
                label="Size"
                type="text"
                value={sizes}
                handleChange={(e) => setSizes(e.target.value)}
              />

              <FormInput
                label="Price"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                value={productPrice}
                handleChange={(e) => setProductPrice(e.target.value)}
              />

              <CKEditor
                data={productDesc}
                onChange={(evt) => setProductDesc(evt.editor.getData())}
              />

              <br />

              <Button type="submit">Save</Button>
            </form>
          </div>{" "}
        </>
      ) : (
        <> loading product </>
      )}
    </>
  );
};

export default ProductEdit;
