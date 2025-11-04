import React from "react";
import "./Category.css";
import CategoryHeader from "./CategoryHeader";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";

export default function Category({
  cat,
  onEditCategoria,
  onDeleteCategoria,
  onAddProducto,
  onEditProducto,
  onDeleteProducto,
}) {
  return (
    <main className="main-category">
      <CategoryHeader
        cat={cat}
        onEditCategoria={onEditCategoria}
        onDeleteCategoria={onDeleteCategoria}
      />

      {cat.imagen && <img src={cat.imagen} alt={cat.nombre} width="120" />}

      <AddProductForm catId={cat.id} onAddProducto={onAddProducto} />

      <ProductList
        productos={Array.isArray(cat.product) ? cat.product : []}
        catId={cat.id}
        onEditProducto={onEditProducto}
        onDeleteProducto={onDeleteProducto}
      />
    </main>
  );
}
