import React, { useState } from "react";

export default function CategoryHeader({
  cat,
  onEditCategoria,
  onDeleteCategoria,
}) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(cat.nombre);

  function handleSave() {
    if (!newName.trim()) return;
    onEditCategoria(cat.id, newName.trim());
    setEditing(false);
  }

  function handleDelete() {
    const res = onDeleteCategoria(cat.id);
    if (res && res.blocked) {
      const confirmForced = window.confirm(
        `La categoría tiene ${res.count} producto(s). ¿Eliminar igualmente?`
      );
      if (confirmForced) onDeleteCategoria(cat.id, { force: true });
    }
  }

  return (
    <div className="category-header">
      {!editing ? (
        <>
          <h2 className="h2-category">{cat.nombre.toUpperCase()}</h2>
          <div className="category-actions">
            <button onClick={() => setEditing(true)}>Editar</button>
            <button onClick={handleDelete}>Borrar</button>
          </div>
        </>
      ) : (
        <div className="edit-name">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}
