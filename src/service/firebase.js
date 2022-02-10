// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apikey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  // appID: process.env.REACT_APP_APP_ID,
  apiKey: "AIzaSyCspx-9yJTX0zapRca3Z9U_WNOwYkyy-As",
  authDomain: "findsmarthospital.firebaseapp.com",
  projectId: "findsmarthospital",
  storageBucket: "findsmarthospital.appspot.com",
  messagingSenderId: "411261757194",
  appId: "1:411261757194:web:bb75ca4b8a4922df71bcf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//signIn
export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// signOut
export const signOut = () => {
  return signOut(auth);
};
