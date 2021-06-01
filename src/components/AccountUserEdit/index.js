import React from "react";
import FileBase64 from "react-file-base64";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { useHistory } from "react-router";
import { editUserForCustomer } from "../../redux/User/user.actions";

const UserAccount = ({ user }) => {
  const [displayName, setDisplayName] = useState("");
  const [userImage, setUserImage] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const resetForm = () => {
    setDisplayName("");
    setUserImage("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUserForCustomer({
        displayName: displayName,
        image: userImage,
        userID: user.documentId,
      })
    );
    resetForm();
    // history.push("/accountManagement");
  };
  useEffect(() => {
    if (user.displayName) {
      setDisplayName(user.displayName);
      setUserImage(user.image);
    }
  }, [user]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Edit Account</h2>

        <FormInput
          label="Name"
          type="text"
          value={displayName}
          handleChange={(e) => setDisplayName(e.target.value)}
        />

        <FileBase64
          accept="image/*"
          multiple={false}
          type="file"
          value={userImage}
          onDone={({ base64 }) => setUserImage(base64)}
        />
        <Button type="submit">Save</Button>
      </form>{" "}
    </>
  );
};

export default UserAccount;
