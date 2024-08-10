import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Admin = () => {
  const [distributors, setDistributors] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    contacto: "",
    email: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los datos de los distribuidores
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/insertDistri", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        // Actualiza la lista de distribuidores después de insertar
        setDistributors((prevDistributors) => [...prevDistributors, formData]);
        setFormData({
          nombre: "",
          direccion: "",
          contacto: "",
          email: "",
        });
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Error al enviar los datos:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta pieza?"
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/deleteDistri/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        // Actualiza la lista de distribuidores después de eliminar
        setDistributors((prevDistributors) =>
          prevDistributors.filter(
            (distributor) => distributor.ID_Distribuidor !== id
          )
        );
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Error al eliminar el distribuidor:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h1>Distribuidores</h1>
      <center>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((distributor) => (
              <tr key={distributor.ID_Distribuidor}>
                <td>
                  <Link to={`/distributor/${distributor.ID_Distribuidor}`}>
                    {distributor.Nombre}
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(distributor.ID_Distribuidor)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>

      <h2>Agregar Nuevo Distribuidor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Teléfono:
            <input
              type="text"
              name="contacto"
              value={formData.contacto}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Agregar Distribuidor</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};
