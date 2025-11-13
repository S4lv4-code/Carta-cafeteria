import React from "react";
import { View } from "react-native";
import { IconButton } from "../../components/Button";
import { colors, spacing } from "../../theme";

export default function ButtonCategory({
  cat,
  onEditCategoria,
  onDeleteCategoria,
}) {
  function handleDelete(){
    onDeleteCategoria(cat.id);
  }
  function handleEdit(){
    onEditCategoria(cat.id);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <IconButton onPress={handleEdit}>Editar</IconButton>
      <IconButton onPress={handleDelete} danger>Borrar</IconButton>
    </View>
  );
}
