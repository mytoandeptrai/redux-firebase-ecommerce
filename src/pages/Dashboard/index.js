import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import {
  getUserOrderHistory,
  fetchOrdersStart,
  fetchOrderUserStart,
} from "./../../redux/Orders/order.actions";
import OrderHistory from "../../components/OrderHistory";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
  orders: ordersData.orders,
});

const Dashboard = (props) => {
  return (
    <>
      <h1>User Profile</h1>
    </>
  );
};

export default Dashboard;
