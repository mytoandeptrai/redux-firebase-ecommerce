import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserOrderHistory,
  fetchOrdersStart,
  fetchOrderUserStart,
} from "./../../redux/Orders/order.actions";
import OrderHistory from "../../components/OrderHistory";
import { checkUserIsAdmin } from "../../Utils/index";
const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderUserHistory: ordersData.orderUserHistory,
  orders: ordersData.orders,
});

const OrderManagement = (props) => {
  const dispatch = useDispatch();
  const { currentUser, orderUserHistory, orders } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, []);
  useEffect(() => {
    dispatch(fetchOrderUserStart(currentUser.id));
  }, []);
  const handleCheck = checkUserIsAdmin(currentUser);
  return (
    <>
      <h1>Order History</h1>
      <OrderHistory orders={orders} />
    </>
  );
};

export default OrderManagement;
