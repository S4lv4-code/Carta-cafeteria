import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header/Header";
import Spacer from "./Spacer/Spacer";
import Category from "./Category/Category";
import Footer from "./Footer/Footer";
import { FormInput } from "../components/FormInput";
import { PrimaryButton } from "../components/Button";
import { spacing, colors, formStyles } from "../theme";

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

  function handleAddCategoria() {
    if (!newCatName.trim()) return;
    onAddCategoria({
      category: newCatName.trim(),
      imagen: newCatImagen.trim() || undefined,
    });
    setNewCatName("");
    setNewCatImagen("");
  }

  return (
    <View style={styles.container}>
      <Header />
      <Spacer />

      <View style={styles.addSection}>
        <FormInput
          placeholder="Nombre categoría"
          value={newCatName}
          onChangeText={setNewCatName}
        />
        <FormInput
          placeholder="URL imagen (opcional)"
          value={newCatImagen}
          onChangeText={setNewCatImagen}
        />
        <PrimaryButton onPress={handleAddCategoria}>
          Agregar categoría
        </PrimaryButton>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center' },
  addSection: { alignItems: 'center', width: '100%', marginVertical: spacing.md, gap: spacing.sm },
});
