import cartTypes from "./cart.types";
import {
  handleAddToCart,
  handleAddToCartFromDetail,
  handleReduceCartItem,
  handleRemoveCartItem,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || []),
  totalPrice: 0,
};

const listProductCart = []; // cái này chứa dữ liệu showw ở cart này, lưu ở reducer Cart
const addToCart = (item) => {
  const indexProduct = listProductCart.findIndex(
    (itemCart) => item.documentId === itemCart.documentId
  );
  // kiểm tra đã có món hàng chưa
  if (indexProduct > -1) {
    //có rồi thì vào đây, tăng quantity
    listProductCart[indexProduct] = {
      ...item,
      quantity: listProductCart[indexProduct].quantity + 1,
    };
  } else {
    //chưa có thì push hàng vào, set quantity là 1
    listProductCart.push({ ...item, quantity: 1 });
  }
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItems: action.payload,
        }),
      };

    case cartTypes.REDUCE_CART_ITEM:
      return {
        ...state,
        cartItems: handleReduceCartItem({
          prevCartItems: state.cartItems,
          cartItemToReduce: action.payload,
        }),
      };
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveCartItem({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        }),
      };
    case cartTypes.CLEAR_CART:
      localStorage.removeItem("cartItems");
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case cartTypes.ADD_TO_CART_FROM_DETAIL:
      return {
        ...state,
        cartItems: handleAddToCartFromDetail({
          prevCartItems: state.cartItems,
          nextCartItems: action.payload,
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
