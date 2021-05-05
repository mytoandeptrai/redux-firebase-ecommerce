import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { selecdCartItemsCount } from "../../redux/Cart/cart.selector";
import { signOutUserStart } from "../../redux/User/user.actions";
import "./style.scss";

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumberCartItems: selecdCartItemsCount(state),
});

const Header = (props) => {
  const { currentUser, totalNumberCartItems } = useSelector(mapState);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutUserStart());
  };
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="My logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart">Your Cart {totalNumberCartItems}</Link>
            </li>

            {currentUser && (
              <>
                <li>
                  <Link to="/dashboard">My Account</Link>
                </li>
                <li>
                  {/* <span onClick={() => auth.signOut()}>LogOut</span> */}
                  <span onClick={() => signOut()}>LogOut</span>
                </li>
              </>
            )}
          </ul>
          <ul>
            {!currentUser && (
              <>
                <li>
                  <Link to="/registration">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
