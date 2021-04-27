import React from "react";
import "./style.scss";
const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}
      <input onChange={handleChange} {...otherProps} className="formInput" />
    </div>
  );
};

export default FormInput;
