import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveOrderHistory } from "../../redux/Orders/order.actions";
import Button from "../forms/Button/index";
import FormInput from "../forms/FormInput";
import "./style.scss";
const mapState = (state) => ({
  cartItems: state.cartData.cartItems,
});
const PaymentDetails = () => {
  const { cartItems } = useSelector(mapState);
  const itemPrice = cartItems.reduce(
    (a, c) => a + c.productPrice * c.quantity,
    0
  );
  const taxPrice = itemPrice * 0.14;
  const shippingPrice = itemPrice > 2000 ? 0 : 50;
  const totalPrice = itemPrice + taxPrice + shippingPrice;
  const dispatch = useDispatch();
  const history = useHistory();
  const [billingAddress, setBillingAddress] = useState({
    date: "",
    cvv: "",
    card_number: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    phone_number: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
  });
  const [recipientName, setRecipientName] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const resetForm = () => {
    setBillingAddress({
      date: "",
      cvv: "",
      card_number: "",
    });
    setShippingAddress({
      address: "",
      phone_number: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isOnlinePayment) {
      if (
        !recipientName ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.country ||
        !shippingAddress.phone_number ||
        !shippingAddress.postal_code ||
        !shippingAddress.state
      )
        return;
      const configOrder = {
        orderTotal: totalPrice,
        orderItems: cartItems.map((item) => {
          const {
            documentId,
            productThumbnails,
            productName,
            productPrice,
            quantity,
            size,
          } = item;
          return {
            documentId,
            productThumbnails,
            productName,
            productPrice,
            quantity,
            size,
          };
        }),
        shipping: shippingAddress,
        orderFinished: false,
      };
      dispatch(saveOrderHistory(configOrder));
      resetForm();
      history.push("/search");
    } else {
      if (
        !recipientName ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.country ||
        !shippingAddress.phone_number ||
        !shippingAddress.postal_code ||
        !shippingAddress.state ||
        !billingAddress.card_number ||
        !billingAddress.cvv ||
        !billingAddress.date ||
        !nameOnCard
      )
        return;
      const formValue = { ...shippingAddress, ...billingAddress };
      const configOrder = {
        ordertotalPrice: totalPrice,
        orderItems: cartItems.map((item) => {
          const {
            documentId,
            productThumbnails,
            productName,
            productPrice,
            quantity,
            size,
          } = item;
          return {
            documentId,
            productThumbnails,
            productName,
            productPrice,
            quantity,
            size,
          };
        }),
        shipping: formValue,
        orderFinished: false,
      };
      dispatch(saveOrderHistory(configOrder));
      resetForm();
      history.push("/search");
    }
  };

  // useEffect(() => {
  //   if (itemCount < 1) {
  //     history.push("/");
  //   }
  // }, [itemCount]);

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput
            value={recipientName}
            name="recipientName"
            handleChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient Name"
            type="text"
          />
          <FormInput
            value={shippingAddress.address}
            name="address"
            handleChange={(e) => handleShipping(e)}
            placeholder="Address"
            type="text"
          />
          <FormInput
            value={shippingAddress.phone_number}
            name="phone_number"
            handleChange={(e) => handleShipping(e)}
            placeholder="Phone Number"
            type="text"
          />
          <FormInput
            value={shippingAddress.city}
            name="city"
            handleChange={(e) => handleShipping(e)}
            placeholder="City"
            type="text"
          />
          <FormInput
            value={shippingAddress.state}
            name="state"
            handleChange={(e) => handleShipping(e)}
            placeholder="State"
            type="text"
          />
          <FormInput
            value={shippingAddress.postal_code}
            name="postal_code"
            handleChange={(e) => handleShipping(e)}
            placeholder="Postal Code"
            type="text"
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              onChange={(val) =>
                handleShipping({
                  target: {
                    name: "country",
                    value: val,
                  },
                })
              }
              value={shippingAddress.country}
              valueType="short"
            />
          </div>
          <div className="forRow btns">
            <span onClick={() => setIsOnlinePayment(true)}>Online Payment</span>
            <span onClick={() => setIsOnlinePayment(false)}>
              Offline Payment
            </span>
          </div>
        </div>
        {isOnlinePayment ? (
          <>
            <div className="group">
              <h2>Billing Address</h2>
              <FormInput
                value={nameOnCard}
                handleChange={(e) => setNameOnCard(e.target.value)}
                placeholder="Name of Card"
                name="nameOnCard"
                type="text"
              />
              <FormInput
                value={billingAddress.date}
                name="date"
                handleChange={(e) => handleBilling(e)}
                placeholder="Date"
                type="text"
              />
              <FormInput
                value={billingAddress.cvv}
                name="cvv"
                handleChange={(e) => handleBilling(e)}
                placeholder="CVV"
                type="text"
              />
              <FormInput
                value={billingAddress.card_number}
                name="card_number"
                handleChange={(e) => handleBilling(e)}
                placeholder="Card Number"
                type="text"
              />
            </div>
          </>
        ) : (
          <></>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
