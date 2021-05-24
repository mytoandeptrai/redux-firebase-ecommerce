import firebase from "firebase/app";
import { firebaseConfig } from "./config";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });

//handleUserProfile
export const handleUserProfile = async ({ userAuth, additionalData }) => {
  console.log(userAuth);
  if (!userAuth) return;
  const { uid } = userAuth;
  //check user in collection
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();
  const userRoles = ["user"];
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        userRoles,
        createdAt: timestamp,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubcribe = auth.onAuthStateChanged((userAuth) => {
      unsubcribe();
      resolve(userAuth);
    }, reject);
  });
};
