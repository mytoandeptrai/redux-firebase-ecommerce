import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "../../redux/User/user.actions";
import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./style.scss";

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const configAuthWrapper = {
    headline: "Login",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
