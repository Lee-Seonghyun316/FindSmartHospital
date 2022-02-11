// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  // apikey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  // appID: process.env.REACT_APP_APP_ID,
  // apiKey: "AIzaSyCspx-9yJTX0zapRca3Z9U_WNOwYkyy-As",
  // authDomain: "findsmarthospital.firebaseapp.com",
  // projectId: "findsmarthospital",
  // storageBucket: "findsmarthospital.appspot.com",
  // messagingSenderId: "411261757194",
  // appId: "1:411261757194:web:bb75ca4b8a4922df71bcf3",

  //databaseURL: "파이어베이스 realtimeDB를 생성후 url을 적습니다",

  apiKey: "AIzaSyBDUfWST1bRd80yeJvnN2l9FK_MBSxO7p4",
  authDomain: "testbed-60f41.firebaseapp.com",
  databaseURL: "https://testbed-60f41-default-rtdb.firebaseio.com",
  projectId: "testbed-60f41",
  storageBucket: "testbed-60f41.appspot.com",
  messagingSenderId: "148567115407",
  appId: "1:148567115407:web:1f3e15d1c43443f5e412fa",
  measurementId: "G-VHR2CS2M59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//signIn
export const googlesignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// signOut
export const googleSignOut = () => {
  return signOut(auth);
};

export const onAuthChange = (handleAuthChange) =>
  onAuthStateChanged(auth, handleAuthChange);
