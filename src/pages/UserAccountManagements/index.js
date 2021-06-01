import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAccount from "../../components/AccountUserEdit";
import { fetchUserStart } from "../../redux/User/user.actions";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const UserAccountManagement = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { currentUser } = useSelector(mapState);
  const loadingUser = useSelector((state) => state.user.loadingUser);

  useEffect(() => {
    dispatch(fetchUserStart(currentUser.id));
  }, []);
  return (
    <>
      <UserAccount user={user} />
    </>
  );
};

export default UserAccountManagement;
