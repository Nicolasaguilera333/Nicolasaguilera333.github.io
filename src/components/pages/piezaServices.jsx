// src/services/piezaService.js

// Configura la URL base del API
const API_URL = "http://localhost:3000/api";

// Función para obtener una pieza por ID
export const getPiezaById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/pieza/${id}`);

    if (!response.ok) {
      // Maneja errores de red o respuesta no exitosa
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la pieza:", error);
    throw error;
  }
};
