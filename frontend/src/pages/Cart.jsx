import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQty } from "@api/cartApi";
import { formatPrice } from "@utils/format";
import "@styles/Cart.scss";

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

    const handleDelete = async (id) => {
        try{
            await removeFromCart(id);
            setCartList((prev) => prev.filter((item) => item.id !== id ));
        }catch(error){
            console.error("Error al eliminar producto", error);
        }
    }

    const handleIncrese = async (prod) => {
        const newQty = prod.qty + 1;
        setCartList((prev) => 
            prev.map((p)=>(p.id===prod.id ? {...p, qty: newQty} : p))
        );
        try{
            await updateQty(prod.id, newQty);
        }catch(error){
            console.error("Error al incrementar la cantidad", error)
        }
    }

    const handleDecrese = async (prod) => {
        if(prod.qty===1) return; //evita ceros o negativos

        const newQty = prod.qty - 1;
        setCartList((prev) => 
            prev.map((p)=>(p.id===prod.id ? {...p, qty: newQty} : p))
        );
        try{
            await updateQty(prod.id, newQty);
        }catch(error){
            console.error("Error al incrementar la cantidad", error)
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
                <p>{formatPrice(prod.unitPrice)}</p>
                <p>
                    <span className="material-symbols-outlined" onClick={()=>handleIncrese(prod)}>
                        add
                    </span>
                    {prod.qty}
                    <span className="material-symbols-outlined" onClick={()=>handleDecrese(prod)}>
                        remove
                    </span>
                </p>
                <p>
                    <span className="material-symbols-outlined" onClick={()=> handleDelete(prod.id)}>
                        delete
                    </span>
                </p>
            </div>
        ))}
        </>
    )
}

export default Cart;