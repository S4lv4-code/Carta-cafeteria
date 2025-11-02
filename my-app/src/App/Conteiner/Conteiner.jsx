import { useState } from "react";
import "./Conteiner.css";
import Header from "./Header/Header";
import Spacer from "./Spacer/Spacer";
import Category from "./Category/Category";
import Footer from "./Footer/Footer";

export default function Conteiner({
  categorias,
  onAddCategoria,
  onEditCategoria,
  onDeleteCategoria,
  onAddProducto,
  onEditProducto,
  onDeleteProducto,
}) {
  const [newCatName, setNewCatName] = useState("");
  const [newCatImagen, setNewCatImagen] = useState("");

  function handleAddCategoria(e) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddCategoria({ category: newCatName.trim(), imagen: newCatImagen.trim() || undefined });
    setNewCatName("");
    setNewCatImagen("");
  }

  return (
    <>
      <Header />
      <Spacer />

      <section className="add-category-section">
        <form onSubmit={handleAddCategoria}>
          <input
            placeholder="Nombre categoría"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <input
            placeholder="URL imagen (opcional)"
            value={newCatImagen}
            onChange={(e) => setNewCatImagen(e.target.value)}
          />
          <button type="submit">Agregar categoría</button>
        </form>
      </section>

      <Spacer />
      {categorias.map((cat) => (
        <Category
          key={cat.id}
          cat={cat}
          onEditCategoria={onEditCategoria}
          onDeleteCategoria={onDeleteCategoria}
          onAddProducto={onAddProducto}
          onEditProducto={onEditProducto}
          onDeleteProducto={onDeleteProducto}
        />
      ))}
      <Spacer />
      <Footer />
    </>
  );
}