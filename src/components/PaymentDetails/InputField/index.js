import { FormGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";
const InputField = (props) => {
  const { field, form, type, label, placeholder, autoComplete } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <FormGroup>
      <TextField
        id={name}
        {...field}
        type={type}
        label={label}
        fullWidth
        autoComplete={autoComplete ? autoComplete : ""}
        helperText={showError ? errors[name] : ""}
        error={showError ? true : false}
      />
    </FormGroup>
  );
};

export default InputField;
