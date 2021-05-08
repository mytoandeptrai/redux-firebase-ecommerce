import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { getUserOrderHistory } from "./../../redux/Orders/order.actions";
import OrderHistory from "../../components/OrderHistory";

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);
  return (
    <>
      <h1>Order History</h1>

      <OrderHistory orders={orderHistory} />
    </>
  );
};

export default Dashboard;
