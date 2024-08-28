import React, { useEffect, useState } from "react";
import avatar from "../../../../public/user.png";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import { GetProfile } from "../../../services/getProfile";

export const Profile = () => {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    GetProfile(params.userId).then((res) => {
      setUserProfile(res);
    });
  }, [params.userId]);

  return (
    <div className="profile-container">
      {userProfile.image != "default.png" && (
        <img
          className="profile-image"
          src={Global.url + "avatar/" + userProfile.image}
          alt="Imagen de perfil"
        />
      )}
      {userProfile.image == "default.png" && (
        <img className="profile-image" src={avatar} alt="Imagen de perfil" />
      )}

      <div className="profile-data">
        <span>
          <strong>Nombre:</strong> {userProfile.name}
        </span>
        <span>
          <strong>Nick:</strong> {userProfile.nick}
        </span>
        <span>
          <strong>Email:</strong> {userProfile.email}
        </span>
        <span>
          <strong>ID:</strong> {userProfile.id}
        </span>
        <span>
          <strong>Fecha de Creación:</strong> {userProfile.created_at}
        </span>
        {userProfile.rol == "role_admin" && (
          <span>
            <strong>Rol:</strong> {userProfile.rol}
          </span>
        )}
      </div>
    </div>
  );
};
