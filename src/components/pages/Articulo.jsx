// import React from "react";
// import ExampleLogo from "../../assets/images/dragorasmalllogo.png";

// export const Articulo = () => {
//   return (
//     <div className="productContainer">
//       <div className="productContainer1">
//         <div className="productImage">
//           <img src={ExampleLogo} alt="" />
//         </div>
//         <div className="productDescript">
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123</p>
//           </div>
//         </div>
//       </div>

//       <div className="productContainer2">
//         <div className="productTitle">
//           <h2>Producto 1</h2>
//         </div>

//         <div className="productDescript">
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123Hola123 Hola123Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123Hola123Hola123Hola123Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>
//               Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123
//             </p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>
//               Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123
//             </p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123</p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>
//               Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123Hola123
//             </p>
//           </div>
//           <div className="productParagraph">
//             <b>Hola: </b>
//             <p>Hola123</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// src/components/AddDistributor.js

import React, { useState } from "react";

export const Articulo = () => {
  const [distributorName, setDistributorName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    setProducts([...products, { name: "", category: "", price: "" }]);
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = products.slice();
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/adddis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: distributorName,
          address,
          phone,
          products,
        }),
      });

      if (response.ok) {
        alert("Distributor added successfully");
      } else {
        alert("Failed to add distributor");
      }
    } catch (error) {
      console.error("Error adding distributor:", error);
      alert("Failed to add distributor");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Distributor</h2>
      <label>
        Name:
        <input
          type="text"
          value={distributorName}
          onChange={(e) => setDistributorName(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>

      <h3>Products</h3>
      {products.map((product, index) => (
        <div key={index}>
          <label>
            Product Name:
            <input
              type="text"
              value={product.name}
              onChange={(e) =>
                handleProductChange(index, "name", e.target.value)
              }
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={product.category}
              onChange={(e) =>
                handleProductChange(index, "category", e.target.value)
              }
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                handleProductChange(index, "price", e.target.value)
              }
              required
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>
        Add Product
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};
