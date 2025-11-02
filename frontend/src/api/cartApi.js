const BASE_URL = "http://localhost:4000/cart";

export async function addToCart(product) {
  const newItem = {
    productId: product.id,
    nombre: product.nombre,
    unitPrice: product.precio,
    qty: 1,
    imagen: product.imagen,
  };

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  if (!res.ok) throw new Error("Erro al agregar al carrito");
  console.log(`Producto agregado al carrito ${newItem}`);
  return res.json();
}

export async function getCart() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw Error("Error al obtener el carrito");
  return res.json();
}

export async function removeFromCart(cartItemId) {
  const res = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar del carrito");
  return true;
}

export async function updateQty(cartItemId, qty) {
  const res = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ qty }),
  });
  if (!res.ok) throw new Error("Error al modificar el carrito");
  return true;
}
