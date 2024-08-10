import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EditPiece = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Obtener el objeto pieza desde el estado de la navegación
  const { piece, distributorId } = location.state || {};
  console.log(distributorId);

  const [editedPiece, setEditedPiece] = useState(piece || {});
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/pieces/${editedPiece.ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editedPiece.Pieza,
            categoryName: editedPiece.Categoria,
            brandName: editedPiece.Marca,
            cantidad: editedPiece.Cantidad,
            precio: editedPiece.Precio,
            idDistribuidor: distributorId,
          }),
        }
      );

      if (response.ok) {
        alert("Pieza actualizada correctamente");
        navigate(`/distributor/${distributorId}`);
      } else {
        const data = await response.json();
        alert(data.error || "Error al actualizar la pieza");
      }
    } catch (err) {
      setError("Error al conectarse con el servidor.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPiece((prevPiece) => ({
      ...prevPiece,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Editar Pieza</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Pieza">Nombre de la Pieza</label>
          <input
            type="text"
            id="Pieza"
            name="Pieza"
            value={editedPiece.Pieza || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Categoria">Categoría</label>
          <input
            type="text"
            id="Categoria"
            name="Categoria"
            value={editedPiece.Categoria || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Marca">Marca</label>
          <input
            type="text"
            id="Marca"
            name="Marca"
            value={editedPiece.Marca || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Cantidad">Cantidad</label>
          <input
            type="number"
            id="Cantidad"
            name="Cantidad"
            value={editedPiece.Cantidad || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Precio">Precio</label>
          <input
            type="number"
            id="Precio"
            name="Precio"
            value={editedPiece.Precio || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <input
          type="hidden"
          name="idDistribuidor"
          value={editedPiece.idDistribuidor || ""}
        />
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
