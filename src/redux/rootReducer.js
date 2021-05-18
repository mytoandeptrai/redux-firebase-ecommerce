import { combineReducers } from "redux";
import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Products/product.reducer";
import userReducer from "./User/user.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ordersReducer from "./Orders/order.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
  ordersData: ordersReducer,
});

export default rootReducer;
