import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "./../InputField/index";

export default function AddressForm({ handleNextStep, setValue, value }) {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    address: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    phoneNumber: Yup.string().matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
    city: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    state: Yup.string()
      .max(10, "Must be characters or less")
      .required("Required"),
    zip: Yup.string()
      .matches(/^\d{5}$|^\d{5}-\d{4}$/, "ZipCode is invalid")
      .required("Required"),
    country: Yup.string()
      .max(10, "Must be characters or less")
      .required("Required"),
  });
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify(values, null, 2));
          setValue(values);
          handleNextStep();
          resetForm();
          setSubmitting(false);
        }}
      >
        {(formikProps) => {
          return (
            <>
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FastField
                      name="firstName"
                      component={InputField}
                      label="First name"
                      placeholder="First Name"
                      type="text"
                      autoComplete="given-name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FastField
                      name="lastName"
                      component={InputField}
                      label="Last name"
                      placeholder="Last name"
                      type="text"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FastField
                      name="address"
                      component={InputField}
                      label="Addresse"
                      placeholder="Address"
                      type="text"
                      autoComplete="shipping address-line2"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FastField
                      name="phoneNumber"
                      component={InputField}
                      label="Phone Number"
                      placeholder="phone Number"
                      type="text"
                      autoComplete="shipping address-line2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FastField
                      name="city"
                      component={InputField}
                      label="City"
                      placeholder="City"
                      type="text"
                      autoComplete="shipping address-line2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FastField
                      name="state"
                      component={InputField}
                      label="State/Province/Region"
                      placeholder="State/Province/Region"
                      type="text"
                      autoComplete="shipping address-line2"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FastField
                      name="zip"
                      component={InputField}
                      label="Zip / Postal code"
                      placeholder="Zip / Postal code"
                      type="text"
                      autoComplete="shipping postal-code"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FastField
                      name="country"
                      component={InputField}
                      label="Country"
                      placeholder="Country"
                      type="text"
                      autoComplete="shipping country"
                    />
                  </Grid>

                  <Grid item xs={10}></Grid>
                  <Grid item xs={2}>
                    <Button variant="contained" color="primary" type="submit">
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
