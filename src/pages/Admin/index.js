import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchOrdersStart } from "../../redux/Orders/order.actions";
import { fetchProductsStart } from "../../redux/Products/products.action";
import formatCurrency from "../../Utils";
import "./style.scss";
const mapState = (state) => ({
  products: state.productsData.products,
  orders: state.ordersData.orders,
});
const Admin = () => {
  const { products, orders } = useSelector(mapState);
  console.log({ orders });
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);
  useEffect(() => {
    dispatch(fetchOrdersStart());
  }, []);
  const totalRevenue = orders.reduce((a, b) => {
    return a + b.ordertotalPrice;
  }, 0);
  return (
    <>
      <div className="admin">
        <h2 className="adminTitle">Overview</h2>
        <div className="adminCards">
          <div className="cardSingle">
            <div className="cardBody">
              <img
                src="https://img.icons8.com/wired/64/000000/refund.png"
                alt="revenue"
              />
              <div className="cardContent">
                <h5>Revenue</h5>
                <h4>{formatCurrency(totalRevenue)}</h4>
              </div>
            </div>
            <div className="cardFooter">
              <p>View All</p>
            </div>
          </div>
          <div className="cardSingle">
            <div className="cardBody">
              <img
                src="https://img.icons8.com/ios/50/000000/used-product.png"
                alt="product"
              />
              <div className="cardContent">
                <h5>Products</h5>
                <h4>{products.data.length}</h4>
              </div>
            </div>
            <div className="cardFooter">
              <p onClick={() => history.push("/productManagement")}>View All</p>
            </div>
          </div>
          <div className="cardSingle">
            <div className="cardBody">
              <img
                src="https://img.icons8.com/pastel-glyph/64/000000/purchase-order.png"
                alt="order"
              />
              <div className="cardContent">
                <h5>Orders</h5>
                <h4>{orders.length}</h4>
              </div>
            </div>
            <div className="cardFooter">
              <p onClick={() => history.push("/orderManagement")}>View All</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
