import productsTypes from "./products.types";

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProducts = (productID) => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID,
});

export const fetchProductStart = (productID) => ({
  type: productsTypes.FETCH_PRODUCT_STARTT,
  payload: productID,
});

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
});

export const editProductStart = (productData) => ({
  type: productsTypes.EDIT_PRODUCT_START,
  payload: productData,
});

export const productDetailSucces = () => ({
  type: productsTypes.PRODUCT_DETAIL_SUCCESS,
});

export const sortProductBySize = (productSize) => ({
  type: productsTypes.PRODUCT_SORT_BY_SIZE,
  payload: productSize,
});

export const sortProductByPrice = (productPrice) => ({
  type: productsTypes.PRODUCT_SORT_BY_PRICE,
  payload: productPrice,
});

export const fetchRelativeProduct = (category) => ({
  type: productsTypes.FETCH_PRODUCT_RELATIVE_START,
  payload: category,
});

export const setRelativeProduct = (productData) => ({
  type: productsTypes.SET_PRODUCT_RELATIVE,
  payload: productData,
});
