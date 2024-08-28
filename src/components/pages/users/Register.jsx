import React, { useState } from "react";
import { UseForm } from "../../../hooks/useForm";
import { Peticion } from "../../../helpers/Peticion";
import { Global } from "../../../helpers/Global";

export const Register = () => {
  const { formulario, cambiado } = UseForm({});
  const [registered, setRegistered] = useState("not_registered");
  const [message, setMessage] = useState({});

  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = formulario;
    //Guardar usuario en el backend
    const { datos } = await Peticion(Global.url + "register", "POST", newUser);

    if (datos.status == "succes") {
      setRegistered("registered");
      setMessage(datos);
    } else {
      setRegistered("error");
      setMessage(datos);
    }
  };

  return (
    <div className="jumbo jumbo-dark">
      <h1>Registro</h1>
      <form onSubmit={saveUser}>
        {registered == "not_registered"
          ? "Completa el formulario de registro:"
          : ""}
        {registered == "registered" ? message.message : ""}
        {registered == "error"
          ? message.status + ":" + message.message + ":" + message.nickname.nick
          : ""}

        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" onChange={cambiado} required />
        </div>
        <div>
          <label htmlFor="surname">Apellidos</label>
          <input type="text" name="surname" onChange={cambiado} />
        </div>
        <div>
          <label htmlFor="nick">Nick</label>
          <input type="text" name="nick" onChange={cambiado} required />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" onChange={cambiado} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={cambiado} />
        </div>

        <input type="submit" value="Registrarte" />
      </form>
    </div>
  );
};
