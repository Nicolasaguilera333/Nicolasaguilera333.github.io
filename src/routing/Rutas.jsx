import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Articulo } from "../components/pages/Articulo";
import { Inicio } from "../components/pages/Inicio";
import { Cotizador } from "../components/pages/Cotizador";
import { Admin } from "../components/pages/Admin";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthProvider";
import { Distri } from "../components/pages/Distri";
import { CreateCompatibilityForm } from "../components/pages/CreateCompatibility";
import { EditPiece } from "../components/pages/EditePiece";
import { PiezaService } from "../components/pages/PiezaDetail";
import { PublicLayout } from "../components/layout/Public/PublicLayout";
import { NormalLayout } from "../components/layout/NormalLayout";
import { Login } from "../components/pages/users/Login";
import { Register } from "../components/pages/users/Register";
import { PrivateLayout } from "../components/layout/Private/PrivateLayout";
import { AdminLayout } from "../components/layout/Private/AdminLayout";
import { Logout } from "../components/pages/users/Logout";
import { Ajustes } from "../components/pages/users/Ajustes";
import { Profile } from "../components/pages/users/Profile";

export const Rutas = () => {
  return (
    <BrowserRouter>
      {/* layout */}
      {/* contenido principal */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<NormalLayout />}>
            <Route index element={<Inicio />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="cotizador" element={<Cotizador />} />
            <Route path="articulo" element={<Articulo />} />
            <Route path="distributor/:id" element={<Distri />} />
          </Route>
          <Route path="/users" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/account" element={<PrivateLayout />}>
            <Route index element={<Inicio />} />
            <Route path="configuration" element={<Ajustes />} />
            <Route path="logout" element={<Logout />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route
              path="create-compatibility/:pieceId"
              element={<CreateCompatibilityForm />}
            />
            <Route path="edit-piece/:pieceId" element={<EditPiece />} />
            <Route path="piece/:id" element={<PiezaService />} />
          </Route>
          {/* RUTA 404 */}
          <Route path="*" element={<NormalLayout />}>
            <Route
              index
              element={
                <div className="jumbo">
                  <h1>Error 404</h1>
                </div>
              }
            />
          </Route>
        </Routes>
        <Sidebar />
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
};
