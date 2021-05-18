import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import formatCurrency from "../../Utils";
import Button from "../forms/Button/index";
import Item from "./Item";
import "./style.scss";

const mapState = (state) => ({
  cartItems: state.cartData.cartItems,
});

const Checkout = ({}) => {
  const history = useHistory();
  const { cartItems } = useSelector(mapState);
  const itemPrice = cartItems.reduce(
    (a, c) => a + c.productPrice * c.quantity,
    0
  );
  const taxPrice = itemPrice * 0.14;
  const shippingPrice = itemPrice > 2000 ? 0 : 50;
  const totalPrice = itemPrice + taxPrice + shippingPrice;
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
                        <th>Size</th>
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
                        <h3>Total : {formatCurrency(totalPrice)}</h3>
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
