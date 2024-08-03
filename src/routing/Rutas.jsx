import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Articulo } from "../components/pages/Articulo";
import { Inicio } from "../components/pages/Inicio";
import { Cotizador } from "../components/pages/Cotizador";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";

export const Rutas = () => {
  return (
    <BrowserRouter>
      {/* layout */}
      <Header />

      {/* contenido principal */}
      <section className="content" id="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/cotizador" element={<Cotizador />} />
          <Route path="/articulo" element={<Articulo />} />
        </Routes>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
