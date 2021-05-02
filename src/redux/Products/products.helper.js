import { firestore } from "../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleFetchProduct = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .orderBy("createdDate")
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentId: doc.id,
          };
        });
        resolve(productsArray);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const handleDeleteProduct = (documentId) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentId)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
