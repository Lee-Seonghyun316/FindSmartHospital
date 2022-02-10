import React from "react";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getUserInfo } from "./firebase";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegionalHospitals from "./components/RegionalHospitals";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signInGoogle = () => {
    signInWithRedirect(auth, provider);
    getUserInfo(auth);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/region" element={<RegionalHospitals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
