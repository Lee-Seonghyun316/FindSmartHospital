// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCspx-9yJTX0zapRca3Z9U_WNOwYkyy-As",
  authDomain: "findsmarthospital.firebaseapp.com",
  projectId: "findsmarthospital",
  storageBucket: "findsmarthospital.appspot.com",
  messagingSenderId: "411261757194",
  appId: "1:411261757194:web:bb75ca4b8a4922df71bcf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const getUserInfo = (auth) => {
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};
