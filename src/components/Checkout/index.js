import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/Cart/cart.selector";
import { createStructuredSelector } from "reselect";
import Button from "../forms/Button/index";
import Item from "./Item";
import { useHistory } from "react-router";
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});
// const mapState = state => state.cartData.cartItems

const Checkout = ({}) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  console.log(cartItems);
  const errMsg = "You have no items in your cart";
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="cart">
        {cartItems.length > 0 ? (
          <>
            <table border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <table
                    className="checkoutHeader"
                    border="0"
                    cellSpacing="0"
                    cellPadding="10"
                  >
                    <tbody>
                      <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Remove</th>
                      </tr>
                    </tbody>
                  </table>
                </tr>

                <tr>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </tr>

                <tr>
                  <table
                    algin="right"
                    border="0"
                    cellSpacing="0"
                    cellPadding="10"
                  >
                    <tr algin="right">
                      <td>
                        <h3>Total:${total}</h3>
                      </td>
                    </tr>
                    <tr>
                      <table border="0" cellSpacing="0" cellPadding="10">
                        <tbody>
                          <tr>
                            <td>
                              <Button onClick={() => history.goBack()}>
                                Continue Shopping
                              </Button>
                            </td>
                            <td>
                              <Button onClick={() => history.push("/payment")}>
                                Checkout
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </tr>
                  </table>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <p>{errMsg}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
