import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteOrders,
  updateShippingOrder,
} from "../../redux/Orders/order.actions";
import formatCurrency, { checkUserIsAdmin } from "../../Utils";
import Button from "./../forms/Button/index";
const columns = [
  {
    id: "orderCreatedDate",
    label: "Order Date",
  },
  {
    id: "documentId",
    label: "Order ID",
  },
  {
    id: "orderTotal",
    label: "Amount",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `$ ${columnValue}`;
    case "orderCreatedDate":
      return moment(columnValue).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const OrderHistory = ({ orders }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const handleCheck = checkUserIsAdmin(currentUser);

  return (
    <>
      {orders ? (
        <>
          {" "}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={styles}>Order Date</TableCell>
                  <TableCell style={styles}>Order ID</TableCell>
                  <TableCell style={styles}>Amount</TableCell>
                  <TableCell style={styles}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(orders) &&
                  orders.length > 0 &&
                  orders.map((row, pos) => {
                    const {
                      documentId,
                      orderCreatedDate,
                      ordertotalPrice,
                      orderFinished,
                    } = row;

                    const orderDate =
                      moment(orderCreatedDate).format("DD/MM/YYYY");
                    return (
                      <TableRow key={pos}>
                        <TableCell style={styles}>{orderDate}</TableCell>
                        <TableCell style={styles}>{documentId}</TableCell>
                        <TableCell style={styles}>{ordertotalPrice}</TableCell>
                        {handleCheck ? (
                          <>
                            <TableCell style={styles}>
                              <Button
                                style={{ marginBottom: "5px" }}
                                onClick={() =>
                                  history.push(`/order/${documentId}`)
                                }
                              >
                                Details
                              </Button>
                              <Button
                                style={{ marginBottom: "5px" }}
                                onClick={() =>
                                  dispatch(updateShippingOrder(documentId))
                                }
                              >
                                {orderFinished === true ? "Done" : "Active"}
                              </Button>
                              <Button
                                onClick={() =>
                                  dispatch(deleteOrders(documentId))
                                }
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell>
                              <h2 style={{ margin: 0 }}>PROCESSING</h2>
                            </TableCell>
                          </>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>{" "}
        </>
      ) : (
        <>
          {" "}
          There is no order here,Please make sure that you have added products
          in your cart !{" "}
        </>
      )}
    </>
  );
};

export default OrderHistory;
