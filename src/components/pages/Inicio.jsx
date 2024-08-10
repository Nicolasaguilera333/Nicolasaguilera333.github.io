import React, { useEffect, useState } from "react";
import ExampleLogo from "../../assets/images/dragorasmalllogo.png";
import heroImage from "../../assets/images/heroimage.jpg";

export const Inicio = () => {
  const [distributors, setDistributors] = useState([]);
  console.log(distributors);
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getAllDistri");
        const data = await response.json();
        if (data.message === "success") {
          setDistributors(data.data);
        } else {
          console.error("Error al obtener distribuidores:", data.error);
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };

    fetchDistributors();
  }, []);

  return (
    <>
      <article
        style={{ backgroundImage: `url(${heroImage})` }}
        className="inicio"
      >
        <div className="jumbo jumbo-dark">
          <div className="inicioContainer">
            <div className="inicioTitulo">
              <h3>
                Encuentra los mejores repuestos automotrices al mejor precio
              </h3>
              <button type="button" className="btn btn-secondary">
                Cotiza Aquí
              </button>
            </div>
          </div>
        </div>
      </article>

      <article className="marcas">
        <div className="marcasContainer">
          {distributors.map((distributor) => (
            <div className="marcaContainer">
              <img src={ExampleLogo} alt="" />
              <p>{distributor.Nombre}</p>
            </div>
          ))}
        </div>
        <div className="marcasTextoContainer">
          <button type="button" className="btn btn-light">
            Cotiza tu marca preferida
          </button>
        </div>
      </article>
    </>
  );
};
