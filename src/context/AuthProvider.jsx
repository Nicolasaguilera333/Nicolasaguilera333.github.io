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
    //Transformar datos a un objeto js
    const userOBJ = JSON.parse(user);
    const userID = userOBJ.id;
    //Peticion ajax que compruebe el token y devuelva los datos
    const request = await fetch(Global.url + "profile/" + userID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await request.json();
    //Setear el estado auth
    setAuth(data.user);
    setLoading(false);
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
