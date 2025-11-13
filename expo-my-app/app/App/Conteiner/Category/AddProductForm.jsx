import React, { useState } from "react";
import { View } from "react-native";
import { FormInput } from "../../components/FormInput";
import { PrimaryButton } from "../../components/Button";
import { formStyles } from "../../theme";

export default function AddProductForm({ catId, onAddProducto }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit() {
    if (!name.trim() || price === "") return;
    onAddProducto(catId, { name: name.trim(), price: parseFloat(price) });
    setName("");
    setPrice("");
  }

  return (
    <View style={formStyles.formContainer}>
      <FormInput
        placeholder="Nombre producto"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <PrimaryButton onPress={handleSubmit}>
        Agregar producto
      </PrimaryButton>
    </View>
  );
}
