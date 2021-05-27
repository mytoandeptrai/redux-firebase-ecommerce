import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth } from "../../firebase/utils";
import {
  fetchProductsStart,
  productDetailSucces,
  setProduct,
  setProducts,
} from "./products.action";
import {
  handleAddProduct,
  handleDeleteProduct,
  handleEditedProduct,
  handleFetchProduct,
  handleFetchProducts,
} from "./products.helper";
import productsTypes from "./products.types";

export function* addProduct({ payload }) {
  try {
    const timestamp = new Date();
    console.log(auth.currentUser);
    yield handleAddProduct({
      ...payload,
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

export function* fetchProduct({ payload }) {
  console.log(payload)
  try {
    const products = yield handleFetchProduct(payload);
    console.log(products);
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

export function* fetchProducts({ payload }) {
  console.log('đặt loading chỗ ni nè')
  try {
    const product = yield handleFetchProducts(payload);
    console.log("🚀 ~ file: products.saga.js ~ line 68 ~ function*fetchProducts ~ product", product)
    yield put(setProduct(product));
    yield put(productDetailSucces());
  } catch (error) {
    console.log(error);
  }finally{
    console.log('tắt loading chỗ ni nè')
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_STARTT, fetchProducts);
}

export function* editProduct({ payload }) {
  try {
    yield handleEditedProduct(payload);
    yield put(fetchProductsStart());
  } catch (error) {
    console.log(error);
  }
}

export function* onEditProductStart() {
  yield takeLatest(productsTypes.EDIT_PRODUCT_START, editProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
    call(onEditProductStart),
  ]);
}
