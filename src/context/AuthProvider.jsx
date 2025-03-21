import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Global";
// import { Peticion } from "../../helpers/Peticion";

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //Sacar datos del usuario del localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    //Comprobar si tengo el token y el usuario
    if (!user || !token) {
      setLoading(false);
      return false;
    }

    try {
      // Transformar datos a un objeto JS
      const userOBJ = JSON.parse(user);
      const userID = userOBJ.id;

      // Petición AJAX para comprobar el token y obtener los datos del usuario
      const request = await fetch(`${Global.url}profile/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!request.ok) {
        throw new Error("Token inválido o ha expirado");
      }

      const data = await request.json();

      // Comprobar si la respuesta es válida y si el usuario está autenticado
      if (data && data.user) {
        setAuth(data.user);
      } else {
        // Si no se devuelve un usuario válido, limpiar el auth y el token
        setAuth(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      // Si ocurre un error (por ejemplo, token inválido)
      console.error("Error autenticando usuario:", error.message);
      setAuth(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <authContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
