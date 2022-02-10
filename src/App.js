import React, { useCallback } from "react";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { getUserInfo } from "./firebase";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegionalHospitals from "./components/RegionalHospitals";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import "./App.css";

function App() {
  const signInGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
    getUserInfo(auth);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/region" element={<RegionalHospitals />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
