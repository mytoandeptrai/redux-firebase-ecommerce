import { put, call, all, takeLatest } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import { setProducts, fetchProductsStart } from "./products.action";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleFetchProduct,
} from "./products.helper";
import productsTypes from "./products.types";

export function* addProduct({
  payload: { productCategory, productName, productThumbnail, productPrice },
}) {
  try {
    const timestamp = new Date();
    console.log(auth.currentUser);
    yield handleAddProduct({
      productCategory,
      productName,
      productThumbnail,
      productPrice,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* fetchProduct() {
  try {
    const products = yield handleFetchProduct();
    yield put(setProducts(products));
  } catch (error) {
    console.log(error);
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ]);
}
