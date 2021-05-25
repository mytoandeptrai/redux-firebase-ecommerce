import { auth, firestore } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch(() => {
        const err = ["Email not found. PLease try again.!"];
        reject(err);
      });
  });
};

export const handleFetchUsers = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        const usersArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentId: doc.id,
          };
        });
        resolve(usersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteUser = (userID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(userID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchUser = (userID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(userID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({ ...snapshot.data(), documentId: snapshot.id });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleEditUser = (userData) => {
  const { displayName, userID, image, userRoles } = userData;
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(userID)
      .update({
        displayName: displayName,
        image: image,
        userRoles: userRoles.split(","),
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
