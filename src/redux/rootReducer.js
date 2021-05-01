import { combineReducers } from "redux";
import productsReducer from "./Products/product.reducer";
import userReducer from "./User/user.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
});
