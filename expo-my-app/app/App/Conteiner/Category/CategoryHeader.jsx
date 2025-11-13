import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Dimensions } from "react-native";
import ButtonCategory from "../Buttons/ButtonCategory";
import { FormInput } from "../../components/FormInput";
import { SmallButton } from "../../components/Button";
import { globalStyles, colors, spacing } from "../../theme";

const { width } = Dimensions.get('window');
const isMobile = width < 600;

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
    Alert.alert(
      'Confirmar eliminación',
      `¿Eliminar la categoría "${cat.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => onDeleteCategoria(cat.id) },
      ]
    );
  }

  return (
    <View style={styles.header}>
      {!editing ? (
        <>
          <Text style={[globalStyles.categoryTitle]}>{cat.nombre.toUpperCase()}</Text>
          <ButtonCategory
            cat={cat}
            onEditCategoria={() => setEditing(true)}
            onDeleteCategoria={handleDelete}
          />
        </>
      ) : (
        <View style={styles.editRow}>
          <FormInput value={newName} onChangeText={setNewName} style={styles.input} />
          <SmallButton onPress={handleSave}>Guardar</SmallButton>
          <SmallButton onPress={() => setEditing(false)}>Cancelar</SmallButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    flexDirection: isMobile ? 'column' : 'row', 
    alignItems: isMobile ? 'flex-start' : 'center', 
    justifyContent: 'space-between', 
    width: '100%',
    marginBottom: isMobile ? spacing.sm : 0,
  },
  editRow: { 
    flexDirection: isMobile ? 'column' : 'row', 
    alignItems: 'center', 
    width: '100%',
    gap: spacing.sm,
  },
  input: { width: isMobile ? '100%' : 'auto', flex: isMobile ? 1 : 0 },
});
