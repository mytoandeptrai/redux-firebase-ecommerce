import {
  handleFilterProductByPrice,
  handleFilterProducts,
} from "./product.utils";
import productsTypes from "./products.types";

const INITIAL_STATE = {
  products: [],
  product: {},
  loadingDetail: true,
  productSortBySize: [],
  productSortByPrice: [],
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
    case productsTypes.PRODUCT_SORT_BY_SIZE:
      return {
        ...state,
        productSortBySize: handleFilterProducts({
          prevProductItems: state.products.data,
          size: action.payload,
        }),
      };

    case productsTypes.PRODUCT_SORT_BY_PRICE:
      console.log(action.payload);
      return {
        ...state,
        productSortByPrice: handleFilterProductByPrice({
          prevProductItems: state.products.data,
          price: action.payload,
        }),
      };

    default:
      return state;
  }
};
export default productsReducer;
