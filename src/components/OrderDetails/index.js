import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../redux/Orders/order.actions";
const columns = [
  {
    id: "productThumbnail",
    label: "",
  },
  {
    id: "productName",
    label: "Name",
  },
  {
    id: "productPrice",
    label: "Price",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
];
const styles = {
  fontSize: "16px",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "productPrice":
      return `$ ${columnValue}`;
    case "productThumbnail":
      return <img src={columnValue} alt="orderimage" width={250} />;
    default:
      return columnValue;
  }
};

const OrderDetails = ({ order }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setOrderDetails({}));
    };
  }, []);
  console.log(order);
  const orderItems = order && order.orderItems;
  console.log(orderItems);
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col, pos) => {
                return (
                  <TableCell style={styles} key={pos}>
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {Array.isArray(orderItems) &&
              orderItems.length > 0 &&
              orderItems.map((row, pos) => {
                return (
                  <TableRow key={pos}>
                    {columns.map((col, pos) => {
                      const columnName = col.id;
                      const columnValue = row[columnName];

                      return (
                        <TableCell style={styles} key={pos}>
                          {formatText(columnName, columnValue)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderDetails;
