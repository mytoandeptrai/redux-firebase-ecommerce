import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderHistory from "../../components/OrderHistory";
import { fetchOrderUserStart } from "../../redux/Orders/order.actions";
const mapState = ({ ordersData, user }) => ({
  orderUserHistory: ordersData.orderUserHistory,
  currentUser: user.currentUser,
});
const OrderUserManagement = () => {
  const dispatch = useDispatch();
  const { currentUser, orderUserHistory } = useSelector(mapState);
  useEffect(() => {
    dispatch(fetchOrderUserStart(currentUser.id));
  }, []);
  return (
    <>
      <h1>Order history</h1>
      <OrderHistory orders={orderUserHistory} />
    </>
  );
};

export default OrderUserManagement;
