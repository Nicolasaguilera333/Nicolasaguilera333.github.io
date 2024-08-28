import React, { useState } from "react";
import { UseForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { Peticion } from "../../../helpers/Peticion";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { formulario, cambiado } = UseForm({});
  const [logged, setLogged] = useState("not_logged");
  const [message, setMessage] = useState({});
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate(); // Cambiado de "navegar" a "navigate" para claridad y consistencia

  const loginUser = async (e) => {
    e.preventDefault();
    //Datos del usuario ha identificar
    let userToLogin = formulario;

    //Peticion al backend
    const { datos } = await Peticion(Global.url + "login", "POST", userToLogin);
    if (datos.status == "success") {
      localStorage.setItem("token", datos.token);
      localStorage.setItem("user", JSON.stringify(datos.user));
      setLogged("login");
      setMessage(datos);
      setAuth(datos.user);
      // Redireccionar a /inicio
      setTimeout(() => {
        navigate("/inicio");
      }, 3000); // Espera 1 segundo antes de redirigir, similar al comportamiento original
    } else {
      setLogged("error");
      setMessage(datos);
    }
  };

  return (
    <div className="jumbo jumbo-dark">
      <header className="content__header content__header--public">
        <h1>Login</h1>
      </header>

      <div className="content-post">
        {logged == "not_logged" ? "Inicio de sesión:" : ""}
        {logged == "login" ? message.message : ""}
        {logged == "error" ? message.message : ""}

        <form onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={cambiado} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={cambiado} />
          </div>
          <input type="submit" value="Iniciar Sesión" />
        </form>
      </div>
    </div>
  );
};
