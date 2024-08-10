import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Articulo } from "../components/pages/Articulo";
import { Inicio } from "../components/pages/Inicio";
import { Cotizador } from "../components/pages/Cotizador";
import { Admin } from "../components/pages/Admin";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Distri } from "../components/pages/Distri";
import { CreateCompatibilityForm } from "../components/pages/CreateCompatibility";
import { EditPiece } from "../components/pages/EditePiece";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/distributor/:id" element={<Distri />} />
          <Route
            path="/create-compatibility/:pieceId"
            element={<CreateCompatibilityForm />}
          />
          <Route path="/edit-piece/:pieceId" element={<EditPiece />} />
        </Routes>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
