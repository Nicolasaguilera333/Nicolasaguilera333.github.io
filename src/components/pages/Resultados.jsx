import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Resultados = () => {
  const location = useLocation();
  const { categoria, marca, modelo, anio } = location.state || {};
  const [piezas, setPiezas] = useState([]);

  useEffect(() => {
    const fetchPiezas = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/piezas?categoria=${categoria}&marca=${marca}&modelo=${modelo}&anio=${anio}`
        );
        const data = await response.json();
        console.log(data);
        setPiezas(data);
      } catch (error) {
        console.error("Error al obtener piezas:", error);
      }
    };

    if (categoria && marca && modelo && anio) {
      fetchPiezas();
    }
  }, [categoria, marca, modelo, anio]);

  return (
    <article className="background">
      <div className="jumbo resultadosContainer">
        <h3>Resultados de la Búsqueda</h3>
        <p className="busquedaMin">
          Resultados de la busqueda:
          {`        ${categoria} 
          ${marca} 
          ${modelo} 
          ${anio}`}
        </p>
        <div className="dataContainer">
          {
            console.log(piezas) // Verifica si ya hay duplicados
          }
          {piezas.length > 0 ? (
            <div className="cuadricula-container">
              {piezas.map((pieza) => (
                <div key={pieza.ID_Pieza} className="cuadricula">
                  <h4>{pieza.Nombre}</h4>
                  {/* Imagen (si tienes) */}
                  <img
                    src={pieza.imagen || "default-image-url"}
                    alt={pieza.Nombre}
                    className="pieza-imagen"
                  />
                  <p>Nombre Pieza: {pieza.Nombre_Pieza || "No disponible"}</p>
                  <p>Marca: {pieza.Nombre_Marca || "No disponible"}</p>
                  <p>
                    Distribuidor: {pieza.Nombre_Distribuidor || "No disponible"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No se encontraron piezas.</p>
          )}
        </div>
      </div>
    </article>
  );
};
