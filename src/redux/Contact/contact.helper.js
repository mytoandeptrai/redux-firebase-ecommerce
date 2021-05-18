import { firestore } from "../../firebase/utils";

export const handleSaveContact = (contact) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("contacts")
      .doc()
      .set(contact)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};
