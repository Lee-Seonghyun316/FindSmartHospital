import React from "react";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getUserInfo } from "./firebase";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider);
  getUserInfo(auth);

  return <div>helloWorld</div>;
}

export default App;
