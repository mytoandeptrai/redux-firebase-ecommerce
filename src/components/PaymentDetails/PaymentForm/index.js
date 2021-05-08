import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FastField, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../InputField/index";
export default function PaymentForm({
  handleNextStep,
  value,
  setValue,
  handlePrevStep,
}) {
  const styles = {
    fontWeight: "normal",
    fontSize: 12,
    color: "gray",
    fontFamily: "Arial",
  };
  const [open, setOpen] = React.useState(false);
  const validate = Yup.object({
    nameOfCard: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    cardNumber: Yup.string().required("Required"),
    expiryDate: Yup.string().required("Required"),
    cvv: Yup.string().required("Required"),
  });
  console.log(value);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Formik
        initialValues={{
          nameOfCard: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(JSON.stringify(values, null, 2));
          const newValue = { ...value, ...values };
          setValue(newValue);
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
                  <Grid item xs={12}>
                    <Button onClick={() => setOpen(!open)}>
                      Online payments
                    </Button>
                    <Button onClick={() => setOpen(false)}>
                      Offline payments
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <p style={styles}>
                      If you want to payment by Visa,Paypal card,... Please
                      press "Online payments" above !
                    </p>
                  </Grid>
                  {open ? (
                    <>
                      {" "}
                      <Grid item xs={12} md={6}>
                        <FastField
                          name="nameOfCard"
                          component={InputField}
                          label="Name Of Card"
                          placeholder="Name Of Card"
                          type="text"
                          autoComplete="cc-name"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FastField
                          name="cardNumber"
                          component={InputField}
                          label="Card Number"
                          placeholder="Card number"
                          type="text"
                          autoComplete="cc-number"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FastField
                          name="expiryDate"
                          component={InputField}
                          label="Expiry date"
                          placeholder="Expiry date"
                          type="text"
                          autoComplete="cc-exp"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FastField
                          name="cvv"
                          component={InputField}
                          label="CVV"
                          placeholder="CVV"
                          type="text"
                          autoComplete="cc-csc"
                        />
                      </Grid>
                      <Grid item xs={10}></Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Next
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          onClick={handleNextStep}
                        >
                          Next
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="button"
                          onClick={handlePrevStep}
                        >
                          Back
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Form>
            </>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
