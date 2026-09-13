import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Detalhes from "./Pages/Detalhes";
import Favoritos from "./Pages/Favoritos";

export default function App() {
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosSalvos = localStorage.getItem("favoritos");
    return favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              favoritos={favoritos}
              setFavoritos={setFavoritos}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="item/:id" element={<Detalhes />} />
          <Route path="favoritos" element={<Favoritos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
