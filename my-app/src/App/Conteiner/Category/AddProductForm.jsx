import React, { useState } from "react";

export default function AddProductForm({ catId, onAddProducto }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || price === "") return;
    onAddProducto(catId, { name: name.trim(), price: parseFloat(price) });
    setName("");
    setPrice("");
  }

  return (
    <section className="add-product">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Precio"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Agregar producto</button>
      </form>
    </section>
  );
}
