import React from "react";
import { View, Image, StyleSheet } from "react-native";
import CategoryHeader from "./CategoryHeader";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";
import ImageSelector from "./ImageSelector";
import { categoryStyles } from "../../theme";

export default function Category({
  cat,
  onEditCategoria,
  onDeleteCategoria,
  onAddProducto,
  onEditProducto,
  onDeleteProducto,
}) {
  function handleImageChange(uri) {
    // enviar objeto parcial para actualizar imagen
    onEditCategoria(cat.id, { imagen: uri });
  }


  return (
    <View style={categoryStyles.container}>
      <CategoryHeader
        cat={cat}
        onEditCategoria={onEditCategoria}
        onDeleteCategoria={onDeleteCategoria}
      />

      <ImageSelector initialImage={cat.imagen} onChange={handleImageChange} />

      <AddProductForm catId={cat.id} onAddProducto={onAddProducto} />

      <ProductList
        productos={Array.isArray(cat.product) ? cat.product : []}
        catId={cat.id}
        onEditProducto={onEditProducto}
        onDeleteProducto={onDeleteProducto}
      />
    </View>
  );
}
