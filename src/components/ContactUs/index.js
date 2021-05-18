import React, { useState } from "react";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import "./style.scss";
import FormTextArea from "../forms/FormTextArea";
import { useDispatch } from "react-redux";
import { saveContactStart } from "../../redux/Contact/contact.actions";
const ContactUs = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const configAuthWrapper = {
    headline: "Contact Us ",
  };
  const resetForm = () => {
    setEmail("");
    setFullName("");
    setMessage("");
    setPhoneNumber("");
  };

  const handleSubmit = (e) => {
    const configContact = {
      email,
      phoneNumber,
      fullName,
      message,
    };
    e.preventDefault();
    dispatch(saveContactStart(configContact));
    resetForm();
  };

  return (
    <>
      <AuthWrapper {...configAuthWrapper}>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="fullName"
            value={fullName}
            placeholder="Enter your fullName"
            handleChange={(e) => setFullName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="number"
            name="numberPhone"
            value={phoneNumber}
            placeholder="What's your phone Number"
            handleChange={(e) => setPhoneNumber(e.target.value)}
          />

          <FormTextArea
            type="text"
            name="message"
            value={message}
            placeholder="Go ahead,we're listening..."
            handleChange={(e) => setMessage(e.target.value)}
          />

          <Button type="submit">Submit</Button>
        </form>
      </AuthWrapper>
    </>
  );
};

export default ContactUs;
