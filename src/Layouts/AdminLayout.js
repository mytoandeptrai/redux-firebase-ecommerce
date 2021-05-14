import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header/index";
import VerticalNav from "../components/VerticalNav";
import { signOutUserStart } from "../redux/User/user.actions";
const AdminLayout = (props) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <div className="adminLayout">
      <Header {...props} />
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/admin">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Manage Orders</Link>
              </li>
              <li>
                <span className="signOut" onClick={signOut}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
