import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Resultados = () => {
  const location = useLocation();
  const { categoria, marca, modelo, anio } = location.state || {};
  const [piezas, setPiezas] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // Estado para controlar el modo de vista
  const [sortOrder, setSortOrder] = useState("asc"); // Estado para el orden

  useEffect(() => {
    const fetchPiezas = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/piezas?categoria=${categoria}&marca=${marca}&modelo=${modelo}&anio=${anio}&orden=${sortOrder}`
        );
        let data = await response.json();

        // Convertir Precio a número
        data = data.map((pieza) => ({
          ...pieza,
          Precio: Number(pieza.Precio),
        }));

        setPiezas(data);
      } catch (error) {
        console.error("Error al obtener piezas:", error);
      }
    };

    if (categoria && marca && modelo && anio) {
      fetchPiezas();
    }
  }, [categoria, marca, modelo, anio, sortOrder]); // Se ejecuta cuando cambia el orden

  return (
    <article className="background">
      <div className="jumbo resultadosContainer">
        <h3>Resultados de la Búsqueda</h3>

        <div className="infoContainer">
          <p className="busquedaMin">
            Resultados de la búsqueda:{" "}
            {`${categoria} ${marca} ${modelo} ${anio}`}
          </p>

          {/* Selector para cambiar el modo de vista */}
          <div className="view-mode-selector">
            <div className="infoContainer">
              <label>Mostrar en: </label>
              <select
                className="leftmargen"
                onChange={(e) => setViewMode(e.target.value)}
                value={viewMode}
              >
                <option value="grid">Cuadrícula</option>
                <option value="list">Lista</option>
              </select>
            </div>
          </div>

          {/* Botón para alternar orden */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="order-button"
          >
            {sortOrder === "asc"
              ? "Ordenar: Mayor a Menor"
              : "Ordenar: Menor a Mayor"}
          </button>
        </div>

        <div className="dataContainer">
          {piezas.length > 0 ? (
            <div
              className={
                viewMode === "grid" ? "cuadricula-container" : "list-container"
              }
            >
              {piezas.map((pieza) => (
                <div
                  key={pieza.ID_Pieza}
                  className={viewMode === "grid" ? "cuadricula" : "list-item"}
                >
                  <h4>{pieza.Nombre}</h4>
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
                  <p>Precio: ${pieza.Precio.toFixed(2) || "No disponible"}</p>
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
