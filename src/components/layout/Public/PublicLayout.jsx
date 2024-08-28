import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "./Header";
import useAuth from "../../../hooks/useAuth";

export const PublicLayout = () => {
  const { auth } = useAuth();
  return (
    <>
      {/* LAYOUT */}
      <Header />
      <section className="content" id="content">
        {!auth.id ? <Outlet /> : <Navigate to="/account" />}
      </section>
    </>
  );
};
