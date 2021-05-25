import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountManagement from "../../components/AccountManagement";
import { fetchUsersStart } from "../../redux/User/user.actions";

const AccountManagements = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loadingUsers = useSelector((state) => state.user.loadingUsers);
  useEffect(() => {
    dispatch(fetchUsersStart());
  }, []);
  return (
    <>
      <AccountManagement users={users} loadingUsers={loadingUsers} />
    </>
  );
};

export default AccountManagements;
