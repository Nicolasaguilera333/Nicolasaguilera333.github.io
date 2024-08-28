import React, { useState, useEffect } from "react";
import smallLogo from "../../../assets/images/smalllogo.png";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatar from "../../../../public/user.png";
import { Global } from "../../../helpers/Global";

export const Pnav = () => {
  const { auth, setAuth } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("customDropdown");
      const button = document.getElementById("dropdownButton");

      if (
        dropdown &&
        button &&
        !button.contains(event.target) &&
        !dropdown.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <nav className="navbar navbar-dark fixed-top">
      <div className="logo">
        <img src={smallLogo} alt="" />
        <h3>COTIZAN2</h3>
      </div>
      <div className="navbarContent">
        <ul>
          <li>
            <NavLink to="/inicio">Inicio</NavLink>
          </li>
          <li>
            <NavLink to="/cotizador">Cotizador</NavLink>
          </li>
          <li>
            <NavLink to="/cotizador">Distribuidores</NavLink>
          </li>
          <li>
            {/* <NavLink to={`/account/profile/${auth.id}`}>
              <img src={avatar} className="avatarImage" alt="" />
            </NavLink> */}
            <NavLink to={"/account/profile/" + auth._id}>
              {auth.image != "default.png" && (
                <span className="bn39span">
                  <img
                    width="45px"
                    height="30px"
                    src={Global.url + "avatar/" + auth.image}
                    className="avatarImage"
                    alt="Imagen de perfil"
                  />
                </span>
              )}
              {auth.image == "default.png" && (
                <span className="bn39span">
                  <img
                    width="45px"
                    height="30px"
                    src={avatar}
                    className="avatarImage"
                    alt="Imagen de perfil"
                  />
                </span>
              )}
            </NavLink>
            <NavLink to={`/account/profile/${auth.id}`}>{auth.name}</NavLink>
          </li>
          <li>
            <NavLink to="/account/configuration">Ajustes</NavLink>
          </li>
          <li>
            <NavLink to="/account/logout">Cerrar sesión</NavLink>
          </li>
        </ul>
      </div>
      {/* <div id="navdata" className="navdata">
        <div className="container-fluid">
          <button
            id="dropdownButton"
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleDropdown}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
         <div
          id="customDropdown"
          className="custom-dropdown"
          style={{ display: isDropdownOpen ? "block" : "none" }}
        >
          <ul>
            <li>
              <NavLink to="/inicio">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/cotizador">Cotizador</NavLink>
            </li>
            <li>
              <NavLink to="/articulo">Articulos</NavLink>
            </li>
          </ul>
        </div> 
      </div> */}
    </nav>
  );
};
