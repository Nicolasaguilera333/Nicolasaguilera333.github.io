import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import { UseForm } from "../../../hooks/useForm";
import avatar from "../../../../public/user.png";
import "../../../../css/ajustes.css";

export const Ajustes = () => {
  const { auth, setAuth } = useAuth();
  const { serializarFormulario } = UseForm();
  const [registered, setRegistered] = useState("not_registered");
  const [message, setMessage] = useState({});

  const updateUser = async (e) => {
    e.preventDefault();
    console.log(e.target);
    //Token de auth
    const token = localStorage.getItem("token");
    //Recoger datos del formulario
    let newUserData = serializarFormulario(e.target);
    delete newUserData.file0;
    //Actualizar usuario en la BD
    const data = await fetch(Global.url + "update", {
      method: "PUT",
      body: JSON.stringify(newUserData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const response = await data.json();

    if (response.status == "succes") {
      delete response.user.password;
      setRegistered("registered");
      setMessage(response);
      setAuth(response.user);
    } else {
      setRegistered("error");
      setMessage(response);
    }
    //subida de imagenes
    const fileInput = document.querySelector("#file");
    if (response.status == "succes" && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      //peticion par enviar el fichero
      const uploadRequest = await fetch(Global.url + "upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      const uploadData = await uploadRequest.json();
      if (uploadData.status == "succes" && uploadData.user) {
        delete uploadData.user.password;
        setRegistered("registered");
        setMessage(uploadData);
        setAuth(uploadData.user);
      } else {
        setRegistered("error");
        setMessage(uploadData);
        console.log(message);
      }
    }
  };

  return (
    <div className="jumbo jumbo-dark">
      <h1>Ajustes.</h1>
      <form onSubmit={updateUser}>
        {registered == "not_registered"
          ? "Completa el formulario de registro:"
          : ""}
        {registered == "registered" ? message.message : ""}
        {registered == "error"
          ? message.status + ":" + message.message + ":" + message.user
          : ""}

        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" defaultValue={auth.name} required />
        </div>
        <div>
          <label htmlFor="nick">Nick</label>
          <input type="text" name="nick" defaultValue={auth.nick} required />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" name="email" defaultValue={auth.email} required />
        </div>
        {/* <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </div> */}

        <div>
          <label htmlFor="file0">Imagen</label>
          <div>
            {auth.image != "default.png" && (
              <img
                width="250px"
                height="150px"
                src={Global.url + "avatar/" + auth.image}
                className="list-end__img"
                alt="Imagen de perfil"
              />
            )}
            {auth.image == "default.png" && (
              <img
                width="250px"
                height="150px"
                src={avatar}
                className="list-end__img"
                alt="Imagen de perfil"
              />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <input type="submit" value="Registrarte" />
      </form>
    </div>
  );
};
