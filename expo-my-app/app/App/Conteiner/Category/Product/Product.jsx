import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, Dimensions } from "react-native";
import { FormInput } from "../../../components/FormInput";
import { IconButton, SmallButton } from "../../../components/Button";
import { productStyles, colors, spacing } from "../../../theme";

const { width } = Dimensions.get('window');
const isMobile = width < 600;

export default function Product({
  prod,
  catId,
  onEditProducto,
  onDeleteProducto,
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(prod.name);
  const [price, setPrice] = useState(String(prod.price));

  function saveEdit() {
    if (!name.trim() || price === "") return;
    onEditProducto(catId, prod.id, { name: name.trim(), price: Number(price) });
    setEditing(false);
  }

  function handleDelete() {
    Alert.alert(
      'Eliminar producto',
      `Eliminar producto "${prod.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Borrar', style: 'destructive', onPress: () => onDeleteProducto(catId, prod.id) },
      ]
    );
  }

  return (
    <View style={styles.item}>
      {!editing ? (
        <>
          <Text style={styles.name}>{prod.name}</Text>
          <Text style={styles.price}>{Number(prod.price).toFixed(2)}</Text>
          <View style={styles.actions}>
            <IconButton onPress={() => {
              setEditing(true);
              setName(prod.name);
              setPrice(String(prod.price));
            }}>Editar</IconButton>
            <IconButton onPress={handleDelete} danger>Borrar</IconButton>
          </View>
        </>
      ) : (
        <View style={styles.editRow}>
          <FormInput value={name} onChangeText={setName} style={styles.input} />
          <FormInput value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
          <SmallButton onPress={saveEdit}>Guardar</SmallButton>
          <SmallButton onPress={() => setEditing(false)}>Cancelar</SmallButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { 
    paddingVertical: 8, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    width: '100%',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'flex-start' : 'center',
    justifyContent: 'space-between',
  },
  name: { 
    fontSize: isMobile ? 13 : 16, 
    marginBottom: isMobile ? 4 : 0,
    flex: isMobile ? 0 : 1,
    width: isMobile ? '100%' : 'auto',
  },
  price: { 
    color: '#666', 
    fontSize: isMobile ? 12 : 14, 
    marginBottom: isMobile ? 6 : 0,
    textAlign: isMobile ? 'left' : 'right',
    marginLeft: isMobile ? 0 : 12,
  },
  actions: { flexDirection: 'row', marginTop: isMobile ? 8 : 8, width: isMobile ? '100%' : 'auto' },
  actionButton: { padding: 8, backgroundColor: '#eee', borderRadius: 6, marginRight: 8, minHeight: 40, justifyContent: 'center' },
  danger: { backgroundColor: 'transparent' },
  editRow: { flexDirection: 'column', alignItems: 'center', width: '100%', gap: spacing.sm },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 6, borderRadius: 6, marginBottom: 8, backgroundColor: '#fff' },
});
