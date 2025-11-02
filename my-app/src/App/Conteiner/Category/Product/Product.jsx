// Product/Product.jsx
import React, { useState } from "react";
import "./Product.css";

export default function Product({ prod, catId, onEditProducto, onDeleteProducto }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(prod.name);
  const [price, setPrice] = useState(prod.price);

  function saveEdit() {
    if (!name.trim() || price === "") return;
    onEditProducto(catId, prod.id, { name: name.trim(), price: Number(price) });
    setEditing(false);
  }

  function handleDelete() {
    const ok = window.confirm(`Eliminar producto "${prod.name}"?`);
    if (ok) onDeleteProducto(catId, prod.id);
  }

  return (
    <li className="product-item">
      {!editing ? (
        <>
          <span className="name">{prod.name}</span>
          <span className="price">{prod.price.toFixed(2)}</span>
          <div className="actions">
            <button onClick={() => { setEditing(true); setName(prod.name); setPrice(prod.price); }}>
              Editar
            </button>
            <button onClick={handleDelete}>Borrar</button>
          </div>
        </>
      ) : (
        <div className="edit-product">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button onClick={saveEdit}>Guardar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </div>
      )}
    </li>
  );
}


