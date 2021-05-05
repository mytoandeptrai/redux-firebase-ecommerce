import React from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  reduceCartItem,
  removeCartItem,
} from "../../../redux/Cart/cart.actions";

const Item = (product) => {
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentId,
  } = product;
  const dispatch = useDispatch();
  const handleRemoveCartItem = (documentId) => {
    dispatch(
      removeCartItem({
        documentId,
      })
    );
  };
  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };
  const handleReduceProduct = (product) => {
    dispatch(reduceCartItem(product));
  };
  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="0">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td className="cartBtn">
            <span onClick={() => handleReduceProduct(product)}>{`< `}</span>
            <span>{quantity}</span>
            <span onClick={() => handleAddProduct(product)}>{` >`}</span>
          </td>
          <td>${productPrice}</td>
          <td align="center">
            <span
              className="cartBtns"
              onClick={() => handleRemoveCartItem(documentId)}
            >
              X
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
