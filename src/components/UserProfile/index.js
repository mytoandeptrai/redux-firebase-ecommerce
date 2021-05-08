import React from "react";
import "./style.scss";
import userIMG from "./../../assets/user.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/user.actions";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={userIMG} />
          </div>
        </li>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <span className="signOut" onClick={() => signOut()}>
            Sign Out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
