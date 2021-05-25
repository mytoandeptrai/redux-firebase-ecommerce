import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { useHistory } from "react-router-dom";
import { editUserStart } from "../../redux/User/user.actions";
const AccountEdit = ({ loadingUser, user }) => {
  const [displayName, setDisplayName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userRoles, setUserRoles] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const resetForm = () => {
    setDisplayName("");
    setUserRoles("");
    setUserImage("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUserStart({
        displayName: displayName,
        image: userImage,
        userRoles: userRoles,
        userID: user.documentId,
      })
    );
    resetForm();
    history.push("/accountManagement");
  };
  useEffect(() => {
    if (loadingUser === false) {
      setDisplayName(user.displayName);
      setUserRoles(user.userRoles.join(","));
      setUserImage(user.image);
    }
  }, [user]);

  return (
    <>
      {loadingUser === false ? (
        <>
          <form onSubmit={handleSubmit}>
            <h2>Edit Account</h2>

            <FormInput
              label="Name"
              type="text"
              value={displayName}
              handleChange={(e) => setDisplayName(e.target.value)}
            />

            <FormInput
              label="Roles"
              type="text"
              value={userRoles}
              handleChange={(e) => setUserRoles(e.target.value)}
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
      ) : (
        <>
          {" "}
          <p>Loading Details</p>{" "}
        </>
      )}
    </>
  );
};

export default AccountEdit;
