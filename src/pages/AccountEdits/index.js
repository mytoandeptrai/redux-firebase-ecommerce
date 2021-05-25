import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AccountEdit from "../../components/AccountEdit";
import { fetchUserStart } from "../../redux/User/user.actions";

const AccountEdits = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loadingUser = useSelector((state) => state.user.loadingUser);

  useEffect(() => {
    dispatch(fetchUserStart(userID));
  }, []);

  return (
    <>
      <AccountEdit user={user} loadingUser={loadingUser} />
    </>
  );
};

export default AccountEdits;
