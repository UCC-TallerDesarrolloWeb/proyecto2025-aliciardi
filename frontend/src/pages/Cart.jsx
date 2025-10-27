import { useEffect, useState } from "react";
import { getCart } from "@api/cartApi";

const Cart = () => {
    const [cartList, setCartList] = useState([]);

    const fetchCart = async () => {
        try{
            const data = await getCart();
            setCartList(data);
        }catch(error){
            console.error(`Error al obtener el carrito ${error}`)
        }
    }

    useEffect(() => {
        fetchCart();
    },[])

    return (
        <>
        <h2>Carrito</h2>
        {cartList.map((prod, id) => (
            <div key={id}>
                <p>{prod.nombre}</p>
                <p>{prod.unitPrice}</p>
            </div>
        ))}
        </>
    )
}

export default Cart;