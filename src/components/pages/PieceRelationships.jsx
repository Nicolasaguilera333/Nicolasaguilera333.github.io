import React, { useState, useEffect } from "react";

export const PieceRelationships = ({ pieceId }) => {
  const [relationships, setRelationships] = useState([]);
  const [filteredRelationships, setFilteredRelationships] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    Marca_Vehículo: { direction: "asc" },
    Modelo_Vehículo: { direction: "asc" },
    Año_Vehículo: { direction: "asc" },
  });

  useEffect(() => {
    const fetchRelationships = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/compatibility/${pieceId}`
        );
        const data = await response.json();

        if (response.ok) {
          setRelationships(data);
          setFilteredRelationships(data);
        } else {
          setError(data.message || "Error al obtener las relaciones");
        }
      } catch (err) {
        setError("Error al conectarse con el servidor.");
      }
    };

    if (pieceId) {
      fetchRelationships();
    }
  }, [pieceId]);

  // Filtrar relaciones basadas en el término de búsqueda
  useEffect(() => {
    const filtered = relationships.filter((relationship) => {
      return (
        relationship.Marca_Vehículo.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
        relationship.Modelo_Vehículo.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
        relationship.Año_Vehículo.toString().includes(searchTerm)
      );
    });
    setFilteredRelationships(filtered);
  }, [searchTerm, relationships]);

  const handleDelete = async (compatibilityId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta compatibilidad?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/compatibility/${compatibilityId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRelationships((prevRelationships) =>
          prevRelationships.filter(
            (relationship) => relationship.ID_Compatibilidad !== compatibilityId
          )
        );
        setFilteredRelationships((prevFiltered) =>
          prevFiltered.filter(
            (relationship) => relationship.ID_Compatibilidad !== compatibilityId
          )
        );
        alert(data.message || "Compatibilidad eliminada correctamente.");
      } else {
        alert(data.error || "Error al eliminar la compatibilidad.");
      }
    } catch (err) {
      alert("Error al conectarse con el servidor.");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig[key] && sortConfig[key].direction === "asc") {
      direction = "desc";
    }

    const sortedRelationships = [...filteredRelationships].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig((prevConfig) => ({
      ...prevConfig,
      [key]: { direction },
    }));
    setFilteredRelationships(sortedRelationships);
  };

  return (
    <div>
      <h3>Relaciones de Compatibilidad</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th
              onClick={() => handleSort("Marca_Vehículo")}
              style={{ cursor: "pointer" }}
            >
              Marca
              {sortConfig["Marca_Vehículo"] &&
                (sortConfig["Marca_Vehículo"].direction === "asc"
                  ? " ↑"
                  : " ↓")}
            </th>
            <th
              onClick={() => handleSort("Modelo_Vehículo")}
              style={{ cursor: "pointer" }}
            >
              Modelo
              {sortConfig["Modelo_Vehículo"] &&
                (sortConfig["Modelo_Vehículo"].direction === "asc"
                  ? " ↑"
                  : " ↓")}
            </th>
            <th
              onClick={() => handleSort("Año_Vehículo")}
              style={{ cursor: "pointer" }}
            >
              Año
              {sortConfig["Año_Vehículo"] &&
                (sortConfig["Año_Vehículo"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {filteredRelationships.length > 0 ? (
            filteredRelationships.map((relationship, index) => (
              <tr key={index}>
                <td>{relationship.ID_Compatibilidad}</td>
                <td>{relationship.Marca_Vehículo}</td>
                <td>{relationship.Modelo_Vehículo}</td>
                <td>{relationship.Año_Vehículo}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(relationship.ID_Compatibilidad)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay relaciones para esta pieza.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
