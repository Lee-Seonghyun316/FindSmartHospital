import React, { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hospitals from "./components/Hospitals";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme} logout={false}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals" element={<Hospitals />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
