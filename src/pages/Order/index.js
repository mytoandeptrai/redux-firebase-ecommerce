import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import OrderDetails from "../../components/OrderDetails";
import { getOrderDetailsStart } from "./../../redux/Orders/order.actions";

const mapState = ({ ordersData }) => ({
  orderDetails: ordersData.orderDetails,
  orders: ordersData.orders,
});

const Order = () => {
  const { orderID } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, orders } = useSelector(mapState);
  const orderDetail = orders.filter((order) => order.documentId === orderID);
  console.log(orderDetail);
  console.log(orderDetails);
  const { orderTotal } = orders;
  useEffect(() => {
    dispatch(getOrderDetailsStart(orderID));
  }, []);
  return (
    <div>
      <h1>Order Id: #{orderID}</h1>
      <OrderDetails order={orderDetails} />
      <h3>Total: {orderTotal}</h3>
    </div>
  );
};

export default Order;
