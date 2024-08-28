import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Pheader } from "./Pheader";
import useAuth from "../../../hooks/useAuth";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  if (loading) {
    return <h1>Cargando..</h1>;
  } else {
    return (
      <>
        {/* LAYOUT */}
        <Pheader />
        <section id="content" className="content">
          {auth.id ? <Outlet /> : <Navigate to="/users/login" />}
        </section>
      </>
    );
  }
};
