import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddPieceForm } from "./AddPieces";
import { AllPiecesByID } from "./AllPiecesByID";

export const Distri = () => {
  const { id } = useParams(); // Obtén el ID del distribuidor de la URL
  const [distributor, setDistributor] = useState(null); // Estado para almacenar el distribuidor
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchDistributor = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/distributors/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setDistributor(data);
        } else {
          setError("Distribuidor no encontrado");
        }
      } catch (err) {
        setError("Error al conectarse con el servidor.");
      }
    };

    fetchDistributor();
  }, [id]); // Dependencia en el ID para volver a ejecutar si cambia

  if (error) return <div>{error}</div>;
  if (!distributor) return <div>Cargando...</div>;

  return (
    <div>
      <h1>{distributor.Nombre}</h1>
      <p>
        <strong>ID Distribuidor:</strong> {distributor.ID_Distribuidor}
      </p>
      <p>
        <strong>Dirección:</strong> {distributor.Dirección}
      </p>
      <p>
        <strong>Teléfono:</strong> {distributor.Teléfono}
      </p>
      <p>
        <strong>Email:</strong> {distributor.Email}
      </p>
      <AddPieceForm distributorId={distributor.ID_Distribuidor} />
      <AllPiecesByID distributorId={distributor.ID_Distribuidor} />
    </div>
  );
};
