import React from "react";
import Product from "./Product/Product";

export default function ProductList({
  productos,
  catId,
  onEditProducto,
  onDeleteProducto,
}) {
  if (!Array.isArray(productos)) productos = [];

  return (
    <ul className="product-list">
      {productos.map((p) => (
        <Product
          key={p.id}
          prod={p}
          catId={catId}
          onEditProducto={onEditProducto}
          onDeleteProducto={onDeleteProducto}
        />
      ))}
    </ul>
  );
}
