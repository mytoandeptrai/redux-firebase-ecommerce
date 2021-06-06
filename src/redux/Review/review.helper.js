import { firestore } from "../../firebase/utils";

export const handleAddNewReview = (productRating, id) => {
  console.log({ productRating, id });
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(id)
      .update(productRating)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchReviews = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({ ...snapshot.data(), documentID: productID });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
