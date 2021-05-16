import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  product: {},
  loadingDetail: true,
};
const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case productsTypes.PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        loadingDetail: false,
      };
    default:
      return state;
  }
};
export default productsReducer;
