import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AllPiecesByID = ({ distributorId }) => {
  const [pieces, setPieces] = useState([]);
  const [filteredPieces, setFilteredPieces] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    ID: { direction: "asc" },
    Pieza: { direction: "asc" },
    Categoría: { direction: "asc" },
    Marca: { direction: "asc" },
    Cantidad: { direction: "asc" },
    Precio: { direction: "asc" },
  });
  const navigate = useNavigate(); // Cambia history por navigate

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/pieces/distributor/${distributorId}`
        );
        const data = await response.json();

        if (response.ok) {
          setPieces(data);
          setFilteredPieces(data); // Inicializa el estado filtrado
        } else {
          setError(data.message || "Error al obtener piezas");
        }
      } catch (err) {
        setError("Error al conectarse con el servidor.");
      }
    };

    fetchPieces();
  }, [distributorId]);

  // Filtrar piezas basadas en el término de búsqueda
  useEffect(() => {
    const filtered = pieces.filter((piece) => {
      return (
        piece.Pieza.toLowerCase().includes(searchTerm.toLowerCase()) ||
        piece.Categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        piece.Marca.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredPieces(filtered);
  }, [searchTerm, pieces]);

  // Función para manejar la eliminación de una pieza
  const handleDelete = async (pieceId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta pieza?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/pieces/${distributorId}/${pieceId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Error al eliminar la pieza.");
      }

      // Actualizar el estado de las piezas independientemente de la respuesta
      setPieces((prevPieces) =>
        prevPieces.filter((piece) => piece.ID !== pieceId)
      );
      setFilteredPieces((prevFiltered) =>
        prevFiltered.filter((piece) => piece.ID !== pieceId)
      );
      alert("Pieza eliminada correctamente.");
    } catch (err) {
      setError("Error al conectarse con el servidor.");
    }
  };

  const handleEdit = (pieceId) => {
    // Buscar el objeto completo basado en el ID
    const piece = pieces.find((p) => p.ID === pieceId);

    // Verificar que se haya encontrado el objeto
    if (piece) {
      // Navegar a la ruta de edición, pasando el objeto como estado
      navigate(`/edit-piece/${pieceId}`, { state: { piece, distributorId } });
    } else {
      alert("Pieza no encontrada.");
    }
  };

  const handleCreateRelation = (pieceId) => {
    navigate(`/create-compatibility/${pieceId}`); // Usa navigate en lugar de history.push
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig[key] && sortConfig[key].direction === "asc") {
      direction = "desc";
    }

    const sortedPieces = [...filteredPieces].sort((a, b) => {
      if (typeof a[key] === "string") {
        if (a[key].toLowerCase() < b[key].toLowerCase())
          return direction === "asc" ? -1 : 1;
        if (a[key].toLowerCase() > b[key].toLowerCase())
          return direction === "asc" ? 1 : -1;
      } else if (typeof a[key] === "number") {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig((prevConfig) => ({
      ...prevConfig,
      [key]: { direction },
    }));
    setFilteredPieces(sortedPieces);
  };

  return (
    <div>
      <h2>Piezas por Distribuidor</h2>
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
            <th scope="col">#</th>
            <th
              scope="col"
              onClick={() => handleSort("ID")}
              style={{ cursor: "pointer" }}
            >
              ID Pieza
              {sortConfig["ID"] &&
                (sortConfig["ID"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("Pieza")}
              style={{ cursor: "pointer" }}
            >
              Pieza
              {sortConfig["Pieza"] &&
                (sortConfig["Pieza"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("Categoría")}
              style={{ cursor: "pointer" }}
            >
              Categoría
              {sortConfig["Categoría"] &&
                (sortConfig["Categoría"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("Marca")}
              style={{ cursor: "pointer" }}
            >
              Marca
              {sortConfig["Marca"] &&
                (sortConfig["Marca"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("Cantidad")}
              style={{ cursor: "pointer" }}
            >
              Cantidad
              {sortConfig["Cantidad"] &&
                (sortConfig["Cantidad"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th
              scope="col"
              onClick={() => handleSort("Precio")}
              style={{ cursor: "pointer" }}
            >
              Precio
              {sortConfig["Precio"] &&
                (sortConfig["Precio"].direction === "asc" ? " ↑" : " ↓")}
            </th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPieces.length > 0 ? (
            filteredPieces.map((piece, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{piece.ID}</td>
                <td>{piece.Pieza}</td>
                <td>{piece.Categoria}</td>
                <td>{piece.Marca}</td>
                <td>{piece.Cantidad}</td>
                <td>${parseFloat(piece.Precio).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(piece.ID)}
                  >
                    Editar
                  </button>{" "}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(piece.ID)}
                  >
                    Eliminar
                  </button>{" "}
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleCreateRelation(piece.ID)}
                  >
                    Crear Relación
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay piezas para este distribuidor.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
