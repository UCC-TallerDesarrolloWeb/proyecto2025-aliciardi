import { useState } from "react";

const Filters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        search: "",
        priceMin: "",
        priceMax: "",
        categories: {
            protectores: false,
            entrenamiento: false,
            dobok: false
        },
        marca: "Todas",
        order: ""
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name.startsWith("category-")) {
            const categoryName = name.replace("category-", "");
            const newFilters = {
                ...filters,
                categories: {
                    ...filters.categories,
                    [categoryName]: checked
                }
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
        } else {
            const newFilters = {
                ...filters,
                [name]: type === "checkbox" ? checked : value
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    };

    return (
      <form>
        <fieldset>
          <legend>Búsqueda</legend>
          <label htmlFor="search">Buscar:</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Palabra..."
            value={filters.search}
            onChange={handleInputChange}
          />
        </fieldset>
        <fieldset>
          <legend>Precios</legend>
          <p>
            <label htmlFor="priceMin">Mínimo:</label>
            <input
              type="number"
              id="priceMin"
              name="priceMin"
              value={filters.priceMin}
              min="0"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <label htmlFor="priceMax">Máximo:</label>
            <input
              type="number"
              id="priceMax"
              name="priceMax"
              value={filters.priceMax}
              min="0"
              onChange={handleInputChange}
            />
          </p>
        </fieldset>
        <fieldset>
          <legend>Tipo de Productos</legend>
          <p>
            <input
              type="checkbox"
              id="protectores"
              name="category-protectores"
              checked={filters.categories.protectores}
              onChange={handleInputChange}
            />
            <label htmlFor="protectores">Protectores</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="entrenamiento"
              name="category-entrenamiento"
              checked={filters.categories.entrenamiento}
              onChange={handleInputChange}
            />
            <label htmlFor="entrenamiento">Entrenamiento</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="dobok"
              name="category-dobok"
              checked={filters.categories.dobok}
              onChange={handleInputChange}
            />
            <label htmlFor="dobok">Dobok</label>
          </p>
        </fieldset>
        <fieldset>
          <legend>Marca</legend>
          <select id="marca" onChange={handleInputChange} name="marca" value={filters.marca}>
            <option value="Todas">Todas</option>
            <option value="Gran Marc">Gran Marc</option>
            <option value="Daedo">Daedo</option>
          </select>
        </fieldset>
        <select id="order" name="order" onChange={handleInputChange} value={filters.order}>
          <option disabled value="">Seleccione un orden</option>
          <option value="menor">Precio - de Menor a Mayor</option>
          <option value="mayor">Precio - de Mayor a Menor</option>
          <option value="a-z">Nombre - de A a la Z</option>
          <option value="z-a">Nombre - de la Z a la A</option>
        </select>
      </form>
    )
}

export default Filters;