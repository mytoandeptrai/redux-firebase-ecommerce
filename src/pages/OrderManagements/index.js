import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrderHistory,
  fetchOrdersStart,
} from "./../../redux/Orders/order.actions";
import OrderHistory from "../../components/OrderHistory";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
  orders: ordersData.orders,
});

const OrderManagement = (props) => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory, orders } = useSelector(mapState);
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, []);
  return (
    <>
      <h1>Order History</h1>
      <OrderHistory orders={orders} />
    </>
  );
};

export default OrderManagement;
