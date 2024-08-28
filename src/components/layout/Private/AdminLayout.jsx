import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Pheader } from "./Pheader";

export const AdminLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return <h1>Cargando..</h1>;
  } else {
    return (
      <>
        {/* LAYOUT */}
        <Pheader />
        <section id="content" className="content">
          {auth.rol == "role_admin" ? <Outlet /> : <Navigate to="/inicio" />}
          <Outlet />
        </section>
      </>
    );
  }
};
