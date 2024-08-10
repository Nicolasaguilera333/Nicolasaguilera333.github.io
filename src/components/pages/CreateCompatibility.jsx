import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PieceRelationships } from "./PieceRelationships";

export const CreateCompatibilityForm = ({ onSave }) => {
  const [marcaVehiculo, setMarcaVehiculo] = useState("");
  const [modeloVehiculo, setModeloVehiculo] = useState("");
  const [anoVehiculo, setAnoVehiculo] = useState("");
  const { pieceId } = useParams(); // Obtén pieceId desde la URL

  console.log(pieceId); // Esto debería mostrar el pieceId en la consola

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/compatibility/${pieceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            marcaVehiculo,
            modeloVehiculo,
            anoVehiculo,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Relación creada correctamente.");
        if (onSave) onSave();
      } else {
        alert(data.error || "Error al crear la relación.");
      }
    } catch (err) {
      alert("Error al conectarse con el servidor.");
    }
  };

  return (
    <div>
      <h2>Crear Relación de Compatibilidad</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="marcaVehiculo">Marca del Vehículo</label>
          <input
            type="text"
            id="marcaVehiculo"
            value={marcaVehiculo}
            onChange={(e) => setMarcaVehiculo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="modeloVehiculo">Modelo del Vehículo</label>
          <input
            type="text"
            id="modeloVehiculo"
            value={modeloVehiculo}
            onChange={(e) => setModeloVehiculo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="anoVehiculo">Año del Vehículo</label>
          <input
            type="number"
            id="anoVehiculo"
            value={anoVehiculo}
            onChange={(e) => setAnoVehiculo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
      <PieceRelationships pieceId={pieceId} />
    </div>
  );
};
