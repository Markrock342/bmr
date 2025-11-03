import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home.jsx";
import Bmi from "./views/bmi.jsx";
import Bmr from "./views/bmr.jsx";
import CarInstallment from "./views/carinstallment.jsx";
import NotFound from "./views/notfound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bmi" element={<Bmi />} />
        <Route path="/bmr" element={<Bmr />} />
        <Route path="/carinstallment" element={<CarInstallment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;