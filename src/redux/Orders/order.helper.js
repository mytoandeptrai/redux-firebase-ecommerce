import { firestore } from "../../firebase/utils";

export const handleSaveOrder = (order) => {
  console.log(order);
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("orders").orderBy("orderCreatedDate");
    ref = ref.where("orderUserID", "==", uid);
    ref
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentId: doc.id,
            };
          }),
        ];
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snap) => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentId: snap.id,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchOrder = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .get()
      .then((snapshot) => {
        const ordersArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentId: doc.id,
          };
        });
        resolve(ordersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleUpdateOrderShipping = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .update({
        orderFinished: true,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

