import React, { useState } from "react";

export const AddPieceForm = ({ distributorId }) => {
  const [pieceName, setPieceName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/addpiece", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pieceName,
          categoryName: categoryName,
          brandName: brandName,
          cantidad: parseInt(quantity, 10),
          precio: parseFloat(price),
          idDistribuidor: distributorId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Pieza agregada correctamente");
        setPieceName("");
        setCategoryName("");
        setBrandName("");
        setQuantity("");
        setPrice("");
      } else {
        throw new Error(data.error || "Error al agregar pieza");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Agregar Pieza</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Pieza:</label>
          <input
            type="text"
            value={pieceName}
            onChange={(e) => setPieceName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre de la Categoría:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre de la Marca:</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Pieza</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
