import React from "react";
const FormInputFormilk = (props) => {
  const { field, form, type, label } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <>
      {label && <label>{label}</label>}
      <input type={type} {...field} />
    </>
  );
};

export default FormInputFormilk;
