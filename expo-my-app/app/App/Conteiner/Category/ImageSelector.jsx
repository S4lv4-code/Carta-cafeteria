import React, { useState, useEffect } from "react";
import { View, Image, Alert, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { PrimaryButton } from "../../components/Button";

export default function ImageSelector({ initialImage = null, onChange }) {
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permiso necesario",
            "Se requiere permiso para acceder a la galería."
          );
        }
      }
    })();
  }, []);

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      const uri = result.assets ? result.assets[0].uri : result.uri;
      if (!result.canceled && uri) {
        setImage(uri);
        onChange && onChange(uri);
      }
    } catch (e) {
      console.warn("Error al seleccionar imagen:", e.message);
    }
  }

  async function takePhoto() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso necesario", "Se requiere permiso para usar la cámara.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
      const uri = result.assets ? result.assets[0].uri : result.uri;
      if (!result.canceled && uri) {
        setImage(uri);
        onChange && onChange(uri);
      }
    } catch (e) {
      console.warn("Error al tomar foto:", e.message);
    }
  }

  return (
    <View style={styles.container}>
      {image ? <Image source={{ uri: image }} style={styles.preview} /> : null}
      <View style={styles.row}>
        <PrimaryButton onPress={pickImage} style={styles.btn}>
          Seleccionar imagen
        </PrimaryButton>
        <PrimaryButton onPress={takePhoto} style={[styles.btn, styles.btnSecondary]}>
          Tomar foto
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 8 },
  preview: { width: '100%', height: 160, resizeMode: 'cover', borderRadius: 8 },
  row: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  btn: { flex: 1, marginRight: 8 },
  btnSecondary: { marginRight: 0 },
});
