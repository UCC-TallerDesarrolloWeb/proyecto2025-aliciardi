import { useEffect, useState } from "react";
import { formatPrice } from "@utils/format";
import "@styles/Store.scss";
import { addToCart } from "@api/cartApi";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);

    const BASE_URL = "http://localhost:4000/productos";

    const fetchProducts = async () => {
        try{
            const response = await fetch(BASE_URL);
            const data = await response.json();
            setProducts(data);
        }catch(error){
            console.error(`Error al realizar un get en el servicio: ${error}`);
        }
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
            <section className="catalogo">
            {products.map((prod, id) => (
                <div key={id} className="card-prod">
                    <h3>{prod.nombre}</h3>
                    <img src={`/productos/${prod.imagen}`} alt={prod.nombre} />
                    <p>{formatPrice(prod.precio)}</p>
                    <button onClick={() => setSelected(prod)}>Ver detalle</button>
                    <button onClick={() => handleCart(prod)} >Agregar al Carrito</button>
                </div>
            ))}
            </section>

            {selected && (<div className="modalProd">
                <h2>Detalle del Producto</h2>
                <p>{selected.nombre}</p>
                <p>{selected.precio}</p>
                <button onClick={cerrarModal}>Cerrar</button>
            </div>)}
        </>
    )
}

export default Store;