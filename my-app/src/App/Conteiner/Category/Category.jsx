// Category/Category.jsx
import React, { useState } from "react";
import "./Category.css";
import Product from "./Product/Product";

export default function Category({
  cat,
  onEditCategoria,
  onDeleteCategoria,
  onAddProducto,
  onEditProducto,
  onDeleteProducto,
}) {
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(cat.category);

  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");

  function handleSaveName() {
    if (!newName.trim()) return;
    onEditCategoria(cat.id, newName.trim());
    setEditingName(false);
  }

  function handleDeleteCategoria() {
    const res = onDeleteCategoria(cat.id);
    if (res && res.blocked) {
      const confirmForced = window.confirm(
        `La categoría tiene ${res.count} producto(s). ¿Eliminar categoría y todos sus productos?`
      );
      if (confirmForced) {
        onDeleteCategoria(cat.id, { force: true });
      } else {
        return;
      }
    }
  }

  function handleAddProducto(e) {
    e.preventDefault();
    if (!newProdName.trim() || newProdPrice === "") return;
    onAddProducto(cat.id, { name: newProdName.trim(), price: Number(newProdPrice) });
    setNewProdName("");
    setNewProdPrice("");
  }

  return (
    <main className="main-category">
      <div className="category-header">
        {!editingName ? (
          <>
            <h2 className="h2-category">{cat.category.toUpperCase()}</h2>
            <div className="category-actions">
              <button onClick={() => { setEditingName(true); setNewName(cat.category); }}>
                Editar
              </button>
              <button onClick={handleDeleteCategoria}>Borrar</button>
            </div>
          </>
        ) : (
          <div className="edit-name">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            <button onClick={handleSaveName}>Guardar</button>
            <button onClick={() => setEditingName(false)}>Cancelar</button>
          </div>
        )}
      </div>

      {cat.imagen && (
        <img src={cat.imagen} alt={cat.category} width="120" />
      )}

      <section className="add-product">
        <form onSubmit={handleAddProducto}>
          <input
            placeholder="Nombre producto"
            value={newProdName}
            onChange={(e) => setNewProdName(e.target.value)}
          />
          <input
            placeholder="Precio"
            type="number"
            step="0.01"
            value={newProdPrice}
            onChange={(e) => setNewProdPrice(e.target.value)}
          />
          <button type="submit">Agregar producto</button>
        </form>
      </section>

      <ul className="product-list">
        {cat.product.map((p) => (
          <Product
            key={p.id}
            prod={p}
            catId={cat.id}
            onEditProducto={onEditProducto}
            onDeleteProducto={onDeleteProducto}
          />
        ))}
      </ul>
    </main>
  );
}
