import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { Header } from "./Public/Header";
import { Pheader } from "./Private/Pheader";

export const NormalLayout = () => {
  const { auth } = useAuth();
  return (
    <>
      {/* LAYOUT */}
      {auth.id ? <Pheader /> : <Header />}
      <section id="content" className="content">
        <Outlet />
      </section>
    </>
  );
};
