import React from "react";
import { View, Image, StyleSheet } from "react-native";
import CategoryHeader from "./CategoryHeader";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";
import { categoryStyles } from "../../theme";

export default function Category({
  cat,
  onEditCategoria,
  onDeleteCategoria,
  onAddProducto,
  onEditProducto,
  onDeleteProducto,
}) {
  return (
    <View style={categoryStyles.container}>
      <CategoryHeader
        cat={cat}
        onEditCategoria={onEditCategoria}
        onDeleteCategoria={onDeleteCategoria}
      />

      {cat.imagen ? (
        <Image source={{ uri: cat.imagen }} style={categoryStyles.image} />
      ) : null}

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
