import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutUserStart } from "./../redux/User/user.actions";

import Header from "./../components/Header";
import VerticalNav from "./../components/VerticalNav";
import Footer from "./../components/Footer";
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
const DashBoardLayout = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const { displayName, image, userRoles } = currentUser;
  const configUser = {
    displayName,
    image,
    userRoles,
  };
  return (
    <div className="dashboardLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <div className="info">
              <p>Name: {displayName}</p>
              <p>Role: {userRoles.join(",")}</p>
            </div>
            <ul>
              <li>
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/userAccountManagement">Manage Account</Link>
              </li>
              <li>
                <Link to="/userOrderManagement">Manage Orders</Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
};
export default DashBoardLayout;
