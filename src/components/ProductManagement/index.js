import CKEditor from "ckeditor4-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import LoadMore from "../../components/LoadMore";
import {
  addProductStart,
  deleteProducts,
  fetchProductsStart,
} from "../../redux/Products/products.action";
import Button from "./../../components/forms/Button";
import FormInput from "./../../components/forms/FormInput";
import FormSelect from "./../../components/forms/FormSelect";
import Modal from "./../../components/Modal";
import "./style.scss";
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductManagement = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector(mapState);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("mens");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productThumbnail2, setProductThumbnail2] = useState("");
  const [productThumbnail3, setProductThumbnail3] = useState("");
  const [size, setSize] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [productDesc, setProductDesc] = useState("");
  const { data, queryDoc, isLastPage } = products;

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const resetForm = () => {
    setProductCategory("mens");
    setProductName("");
    setProductPrice(0);
    setProductThumbnail("");
    setProductThumbnail2("");
    setProductThumbnail3("");
    setSize("");
    setHideModal(true);
    setProductDesc("");
    setProductDiscount(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnails: [
          productThumbnail,
          productThumbnail2,
          productThumbnail3,
        ],
        productSizes: size.split(","),
        count: 1,
        productPrice,
        productDiscount,
        productDesc,
      })
    );
    resetForm();
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };
  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={handleSubmit}>
            <h2>Add new product</h2>

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
                {
                  value: "perfume",
                  name: "Perfume",
                },
                {
                  value: "faceWash",
                  name: "Face Wash",
                },
                {
                  value: "combo",
                  name: "Combo",
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
              label="Second main image URL"
              type="url"
              value={productThumbnail2}
              handleChange={(e) => setProductThumbnail2(e.target.value)}
            />

            <FormInput
              label="Third main image URL"
              type="url"
              value={productThumbnail3}
              handleChange={(e) => setProductThumbnail3(e.target.value)}
            />

            <FormInput
              label="Enter sizes with `,` between them"
              type="text"
              value={size}
              handleChange={(e) => setSize(e.target.value)}
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

            <FormInput
              label="Discount"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productDiscount}
              handleChange={(e) => setProductDiscount(e.target.value)}
            />

            <CKEditor
              onChange={(evt) => setProductDesc(evt.editor.getData())}
            />

            <br />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>

      <div className="manageProducts">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product, index) => {
                        const {
                          productName,
                          productPrice,
                          productThumbnails,
                          documentId,
                        } = product;

                        return (
                          <tr key={index}>
                            <td>
                              <img
                                className="thumb"
                                src={productThumbnails[0]}
                                width="150rem"
                                alt="product"
                              />
                            </td>
                            <td>{productName}</td>
                            <td>??{productPrice}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  history.push(`admin/${documentId}`)
                                }
                              >
                                Edit
                              </Button>
                            </td>
                            <td>
                              <Button
                                onClick={() =>
                                  dispatch(deleteProducts(documentId))
                                }
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10px" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
