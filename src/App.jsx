import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Theme from "./pages/Theme";

export default function App() {
  useEffect(() => {
    const themeColors = JSON.parse(localStorage.getItem("theme"));
    if (themeColors) {
      const root = document.documentElement;
      Object.entries(themeColors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/theme" element={<Theme />} />
    </Routes>
  );
}
