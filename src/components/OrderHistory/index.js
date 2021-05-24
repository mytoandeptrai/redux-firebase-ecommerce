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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteOrders,
  updateShippingOrder,
} from "../../redux/Orders/order.actions";
import formatCurrency from "../../Utils";
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

const OrderHistory = ({ orders }) => {
  console.log(orders);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* {columns.map((column, pos) => {
                const { label } = column;
                return (
                  <TableCell key={pos} style={styles}>
                    {label}
                  </TableCell>
                );
              })} */}
              <TableCell style={styles}>Order Date</TableCell>
              <TableCell style={styles}>Order ID</TableCell>
              <TableCell style={styles}>Amount</TableCell>
              <TableCell style={styles}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {Array.isArray(orders) &&
              orders.length > 0 &&
              orders.map((row, pos) => {
                const { documentId } = row;
                return (
                  <TableRow
                    key={pos}
                    onClick={() => history.push(`/order/${documentId}`)}
                  >
                    {columns.map((column, pos) => {
                      const columnName = column.id;
                      const columnValue = row[columnName];
                      const formattedText = formatText(columnName, columnValue);
                      return (
                        <>
                          <TableCell key={pos} style={styles}>
                            {formattedText}
                          </TableCell>
                        </>
                      );
                    })}

                    <TableCell style={styles}>
                      <Button style={{ marginBottom: "5px" }}>OK</Button>
                      <Button
                        onClick={() => dispatch(deleteOrders(documentId))}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })} */}
            {Array.isArray(orders) &&
              orders.length > 0 &&
              orders.map((row, pos) => {
                console.log(row);
                const {
                  documentId,
                  orderCreatedDate,
                  ordertotalPrice,
                  orderFinished,
                } = row;
                console.log(typeof orderFinished);
                const orderDate = moment(orderCreatedDate).format("DD/MM/YYYY");
                return (
                  <TableRow key={pos}>
                    <TableCell style={styles}>{orderDate}</TableCell>
                    <TableCell style={styles}>{documentId}</TableCell>
                    <TableCell style={styles}>
                      {(ordertotalPrice)}
                    </TableCell>
                    <TableCell style={styles}>
                      <Button
                        style={{ marginBottom: "5px" }}
                        onClick={() => history.push(`/order/${documentId}`)}
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
                        onClick={() => dispatch(deleteOrders(documentId))}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderHistory;
