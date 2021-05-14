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

export const handleFetchProduct = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
  searchProduct,
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6;
    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize);
    console.log(searchProduct);
    if (searchProduct) ref = ref.where("productName", "==", searchProduct);
    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);
    ref
      .get()
      .then((snapshot) => {
        // const productsArray = snapshot.docs.map((doc) => {
        //   return {
        //     ...doc.data(),
        //     documentId: doc.id,
        //   };
        // });
        // resolve(productsArray);
        const totalCount = snapshot.size;
        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentId: doc.id,
            };
          }),
        ];
        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1, // bolean value
        });
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

export const handleFetchProducts = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
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

export const handleEditedProduct = (product) => {
  console.log(product);
  const {
    documentId,
    productCategory,
    productDesc,
    productPrice,
    productThumbnail,
    productName,
  } = product;
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentId)
      .update({
        productCategory: productCategory,
        productDesc: productDesc,
        productPrice: productPrice,
        productThumbnail: productThumbnail,
        productName: productName,
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
