import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    //setear el localstorage
    localStorage.clear();
    //Setear los estados globales
    setAuth({});
    //Navigate hacia el login

    // navigate('/users/login')
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, []);

  return (
    <>
      <h1>Cerrando sesión...</h1>
    </>
  );
};
