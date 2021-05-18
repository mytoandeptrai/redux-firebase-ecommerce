import React from "react";
import "./style.scss";
const FormTextArea = ({ handleChange, label, ...otherProps }) => {
  return (
    <div className="formRow">
      {label && <label>{label}</label>}
      <textarea onChange={handleChange} {...otherProps} />
    </div>
  );
};

export default FormTextArea;
