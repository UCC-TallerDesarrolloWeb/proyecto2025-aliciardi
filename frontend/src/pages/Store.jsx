import { useEffect, useState } from "react";
import { formatPrice } from "@utils/format";
import "@styles/Store.scss";
import { addToCart } from "@api/cartApi";
import { getProducts } from "../api/productApi";
import Filters from "@components/Filters";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([])

    const fetchProducts = async () => {
        try{
            const data = await getProducts();
            setProducts(data);
            setFilteredProducts(data);
        }catch(error){
            console.error(`Error al realizar un get en el servicio: ${error}`);
        }
    }

    const handleFilterChange = (filters) => {
        let filtered = [...products];

        // Filtro por búsqueda
        if (filters.search) {
            filtered = filtered.filter(prod =>
                prod.nombre.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Filtro por precio mínimo
        if (filters.priceMin !== "" && filters.priceMin !== null) {
            filtered = filtered.filter(prod => prod.precio >= Number(filters.priceMin));
        }

        // Filtro por precio máximo
        if (filters.priceMax !== "" && filters.priceMax !== null) {
            filtered = filtered.filter(prod => prod.precio <= Number(filters.priceMax));
        }

        // Filtro por categorías
        const selectedCategories = Object.keys(filters.categories).filter(
            key => filters.categories[key]
        );
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(prod =>
                selectedCategories.includes(prod.categoria?.toLowerCase())
            );
        }

        // Filtro por marca
        if (filters.marca && filters.marca !== "Todas") {
            filtered = filtered.filter(prod => prod.marca === filters.marca);
        }

        // Ordenamiento
        if (filters.order) {
            switch (filters.order) {
                case "menor":
                    filtered.sort((a, b) => a.precio - b.precio);
                    break;
                case "mayor":
                    filtered.sort((a, b) => b.precio - a.precio);
                    break;
                case "a-z":
                    filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
                    break;
                case "z-a":
                    filtered.sort((a, b) => b.nombre.localeCompare(a.nombre));
                    break;
            }
        }

        setFilteredProducts(filtered);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const cerrarModal = () => {
        setSelected(null);
    }

    const handleCart = async (prod) => {
        try {
        await addToCart(prod);
        } catch (e) {
        console.error(e);
        }
    };

    return (
        <>
            <h2>Catálogo de Productos</h2>
            <div className="grilla">
                <Filters onFilterChange={handleFilterChange} className="asideFilters" />
                <section className="catalogo">
                {filteredProducts.map((prod, id) => (
                    <div key={id} className="card-prod">
                        <h3>{prod.nombre}</h3>
                        <img src={`/productos/${prod.imagen}`} alt={prod.nombre} />
                        <p>{formatPrice(prod.precio)}</p>
                        <button onClick={() => setSelected(prod)}>Ver detalle</button>
                        <button onClick={() => handleCart(prod)} >Agregar al Carrito</button>
                    </div>
                ))}
                </section>
            </div>

            {selected && (
                <div className="modalProd">
                    <h2>Detalle del Producto</h2>
                    <p>{selected.nombre}</p>
                    <p>{formatPrice(selected.precio)}</p>
                    <button onClick={cerrarModal}>Cerrar</button>
                </div>
            )}
        </>
    )
}

export default Store;