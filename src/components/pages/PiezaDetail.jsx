import React, { useState, useEffect } from "react";
import { getPiezaById } from "./piezaServices";
import { useParams } from "react-router-dom"; // Importa useParams para acceder a los parámetros de la ruta

export const PiezaService = () => {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la ruta
  const [piezaData, setPiezaData] = useState(null); // Renombrado a piezaData para reflejar la estructura de datos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar la pieza
    const fetchPieza = async () => {
      try {
        const data = await getPiezaById(id);
        setPiezaData(data); // Ajustado para reflejar la estructura correcta
      } catch (err) {
        setError("Error al cargar la pieza.");
      } finally {
        setLoading(false);
      }
    };

    fetchPieza();
  }, [id]);

  // Asegúrate de que piezaData esté definido antes de acceder a sus propiedades
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Asegúrate de que piezaData y piezaData.pieza están definidos
  const pieza = piezaData?.pieza;

  return (
    <div>
      <h2>Detalle de la Pieza</h2>
      {pieza ? (
        <div>
          <p>
            <strong>ID:</strong> {pieza.ID_Pieza}
          </p>
          <p>
            <strong>Nombre:</strong> {pieza.Nombre_Pieza}
          </p>
          <p>
            <strong>Categoría:</strong> {pieza.Nombre_Categoria}
          </p>
          <p>
            <strong>Marca:</strong> {pieza.Nombre_Marca}
          </p>
        </div>
      ) : (
        <p>Pieza no encontrada.</p>
      )}
    </div>
  );
};
