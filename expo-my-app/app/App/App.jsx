import React, { useState, useEffect } from "react";
import { ScrollView, ImageBackground, View } from "react-native";
import Conteiner from "./Conteiner/Conteiner";
import { globalStyles } from "./theme";

const API_BASE = "https://jlorenzo.ddns.net/carta_restaurante";
const USER_ID = 1;

export default function App() {
  const [categorias, setCategorias] = useState([]);

  async function fetchCategorias() {
    try {
      const res = await fetch(`${API_BASE}/categorias/?usuario_id=${USER_ID}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      // Extraer data correctamente
      const arr = json.data;
      if (!Array.isArray(arr)) {
        console.error("Formato inesperado en /categorias:", json);
        setCategorias([]);
        return;
      }

      const categoriasNormalizadas = arr.map((c) => ({
        id: c.id,
        nombre: c.nombre,
        imagen: "",
        product: [],
      }));

      setCategorias(categoriasNormalizadas);

      for (const cat of categoriasNormalizadas) {
        await fetchProductos(cat.id);
      }
    } catch (err) {
      console.error("Error fetchCategorias:", err);
      setCategorias([]);
    }
  }

  async function fetchProductos(catId) {
    try {
      const res = await fetch(
        `${API_BASE}/productos/${catId}?usuario_id=${USER_ID}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const arr = Array.isArray(json.data)
        ? json.data
        : Array.isArray(json)
        ? json
        : [];

      if (!Array.isArray(arr)) {
        console.error("Formato inesperado en /productos:", json);
        return;
      }

      const productosNormalizados = arr.map((p) => ({
        id: p.id,
        name: p.nombre,
        price: parseFloat(p.precio),
      }));

      setCategorias((prev) =>
        prev.map((c) =>
          c.id === catId ? { ...c, product: productosNormalizados } : c
        )
      );
    } catch (err) {
      console.error("Error fetchProductos:", err);
    }
  }

  // ---------- CATEGORÍAS ----------
  async function addCategoria({ category }) {
    const body = { usuario_id: USER_ID, nombre: category };
    try {
      const res = await fetch(`${API_BASE}/categorias/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchCategorias();
    } catch (err) {
      console.error("Error addCategoria:", err);
    }
  }

  async function editCategoria(id, newName) {
    const body = { usuario_id: USER_ID, nombre: newName, orden: 1 };
    try {
      const res = await fetch(`${API_BASE}/categorias/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchCategorias();
    } catch (err) {
      console.error("Error editCategoria:", err);
    }
  }

  async function deleteCategoria(id) {
    const body = { usuario_id: USER_ID };
    try {
      const res = await fetch(`${API_BASE}/categorias/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchCategorias();
    } catch (err) {
      console.error("Error deleteCategoria:", err);
    }
  }

  // ---------- PRODUCTOS ----------
  async function addProducto(catId, { name, price }) {
    const body = {
      usuario_id: USER_ID,
      nombre: name,
      precio: parseFloat(price),
      orden: 1,
    };
    try {
      const res = await fetch(`${API_BASE}/productos/${catId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchProductos(catId);
    } catch (err) {
      console.error("Error addProducto:", err);
    }
  }

  async function editProducto(catId, prodId, { name, price }) {
    const body = {
      usuario_id: USER_ID,
      nombre: name,
      precio: parseFloat(price),
    };
    try {
      const res = await fetch(`${API_BASE}/productos/${prodId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchProductos(catId);
    } catch (err) {
      console.error("Error editProducto:", err);
    }
  }

  async function deleteProducto(catId, prodId) {
    const body = { usuario_id: USER_ID };
    try {
      const res = await fetch(`${API_BASE}/productos/${prodId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchProductos(catId);
    } catch (err) {
      console.error("Error deleteProducto:", err);
    }
  }

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    console.log("Categorías cargadas:", categorias);
  }, [categorias]);

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.freecodecamp.org/curriculum/css-cafe/beans.jpg' }}
      style={globalStyles.scrollView}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={globalStyles.contentContainer}>
        <View style={globalStyles.container}>
          <Conteiner
            categorias={categorias}
            onAddCategoria={addCategoria}
            onEditCategoria={editCategoria}
            onDeleteCategoria={deleteCategoria}
            onAddProducto={addProducto}
            onEditProducto={editProducto}
            onDeleteProducto={deleteProducto}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
