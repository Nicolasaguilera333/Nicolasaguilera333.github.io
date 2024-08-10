import React, { useState, useEffect } from "react";
import smallLogo from "../../assets/images/smalllogo.png";
import { NavLink } from "react-router-dom";

export const Nav = () => {
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
      <div id="navdata" className="navdata">
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
      </div>
    </nav>
  );
};
