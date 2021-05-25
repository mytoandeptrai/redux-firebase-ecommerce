import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteUserStart } from "../../redux/User/user.actions";
import Button from "../forms/Button";

const AccountManagement = ({ users, loadingUsers }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const styles = {
    fontSize: "16px",
    cursor: "pointer",
    width: "10%",
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={styles}>User ID</TableCell>
              <TableCell style={styles}>User Image</TableCell>
              <TableCell style={styles}>User Name</TableCell>
              <TableCell style={styles}>User Email</TableCell>
              <TableCell style={styles}>User Roles</TableCell>
              <TableCell style={styles}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingUsers ? (
              <> Loading User </>
            ) : (
              <>
                {" "}
                {Array.isArray(users) &&
                  users.length > 0 &&
                  users.map((row, pos) => {
                    return (
                      <TableRow key={pos}>
                        <TableCell style={styles}>{row.documentId}</TableCell>
                        <TableCell style={styles}>
                          <img src={row.image} alt="imageUser" width="50" />
                        </TableCell>
                        <TableCell style={styles}>{row.displayName}</TableCell>
                        <TableCell style={styles}>{row.email}</TableCell>
                        <TableCell style={styles}>
                          {row.userRoles.join(",")}
                        </TableCell>
                        <TableCell style={styles}>
                          <Button
                            style={{ marginBottom: 20 }}
                            onClick={() =>
                              history.push(
                                `accountManagement/${row.documentId}`
                              )
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              dispatch(deleteUserStart(row.documentId))
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AccountManagement;
