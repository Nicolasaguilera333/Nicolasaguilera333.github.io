import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate

export const Cotizador = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  useEffect(() => {
    // Cargar las categorías al inicio
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categorias");
        const data = await response.json();
        setCategories(data.categorías);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Cargar marcas por categoría
      const fetchBrands = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/marcas/${selectedCategory}`
          );
          const data = await response.json();
          setBrands(data);
        } catch (error) {
          console.error("Error al obtener marcas:", error);
        }
      };
      fetchBrands();
    } else {
      setBrands([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory && selectedBrand) {
      // Cargar modelos por categoría y marca de vehículo
      const fetchModels = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/modelos/${selectedCategory}/${selectedBrand}`
          );
          const data = await response.json();
          setModels(data);
        } catch (error) {
          console.error("Error al obtener modelos:", error);
        }
      };
      fetchModels();
    } else {
      setModels([]);
    }
  }, [selectedCategory, selectedBrand]);

  useEffect(() => {
    if (selectedCategory && selectedBrand && selectedModel) {
      // Cargar años por categoría, marca y modelo
      const fetchYears = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/anos/${selectedCategory}/${selectedBrand}/${selectedModel}`
          );
          const data = await response.json();
          // Crear un rango de años a partir del resultado
          if (data.Año_Inicio_Minimo !== null && data.Año_Fin_Maximo !== null) {
            const yearRange = [];
            for (
              let year = data.Año_Inicio_Minimo;
              year <= data.Año_Fin_Maximo;
              year++
            ) {
              yearRange.push(year);
            }
            setYears(yearRange);
          } else {
            setYears([]);
          }
        } catch (error) {
          console.error("Error al obtener años:", error);
        }
      };
      fetchYears();
    } else {
      setYears([]);
    }
  }, [selectedCategory, selectedBrand, selectedModel]);

  const handleSearch = () => {
    navigate("/resultados", {
      state: {
        categoria: selectedCategory,
        marca: selectedBrand,
        modelo: selectedModel,
        anio: selectedYear,
      },
    });
  };

  return (
    <article className="background">
      <div className="jumbo jumbo-dark">
        <h3>Búsqueda de Piezas</h3>
        <div className="mb-3">
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.ID_Categoria} value={category.Nombre}>
                {category.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="brand">Marca:</label>
          <select id="brand" onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="">Seleccione una marca</option>
            {brands.map((brand) => (
              <option key={brand.Marca} value={brand.Marca}>
                {brand.Marca}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="model">Modelo:</label>
          <select id="model" onChange={(e) => setSelectedModel(e.target.value)}>
            <option value="">Seleccione un modelo</option>
            {models.map((model) => (
              <option key={model.Modelo} value={model.Modelo}>
                {model.Modelo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="year">Año:</label>
          <select id="year" onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Seleccione un año</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch}>Buscar</button>
      </div>
    </article>
  );
};
