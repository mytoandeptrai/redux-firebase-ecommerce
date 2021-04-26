import React from "react";
import "./style.scss";
const Button = ({ children, ...otherProps }) => {
  return (
    <>
      <button {...otherProps} className="btn">
        {children}
      </button>
    </>
  );
};

export default Button;
