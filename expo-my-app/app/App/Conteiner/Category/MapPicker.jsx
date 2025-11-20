import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, Platform } from "react-native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

export default function MapPicker({ initialLocation = null, onChange }) {
  const [coord, setCoord] = useState(initialLocation || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialLocation) setCoord(initialLocation);
  }, [initialLocation]);

  async function useMyLocation() {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener la ubicación.');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const c = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
      setCoord(c);
      onChange && onChange(c);
    } catch (e) {
      console.warn('Error al obtener ubicación:', e.message);
      Alert.alert('Error', 'No se pudo obtener la ubicación.');
    } finally {
      setLoading(false);
    }
  }

  function openExternalMap() {
    const lat = coord ? coord.latitude : -34.6037;
    const lon = coord ? coord.longitude : -58.3816;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    Linking.openURL(url).catch((err) => {
      console.warn('No se pudo abrir Maps:', err.message);
      Alert.alert('Error', 'No se pudo abrir la aplicación de mapas.');
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ubicación de la cafetería</Text>
      <View style={styles.infoRow}>
        <Text>Lat: {coord ? coord.latitude.toFixed(6) : '—'}</Text>
        <Text style={{ marginLeft: 12 }}>Lon: {coord ? coord.longitude.toFixed(6) : '—'}</Text>
      </View>
      <View style={styles.row}>
        <Button title={loading ? 'Obteniendo...' : 'Usar mi ubicación'} onPress={useMyLocation} disabled={loading} />
        <View style={{ width: 10 }} />
        <Button title="Abrir en Maps" onPress={openExternalMap} />
      </View>
      <View style={{ marginTop: 8 }}>
        <Button title="Confirmar ubicación en la app" onPress={() => onChange && onChange(coord)} disabled={!coord} />
      </View>
      <Text style={styles.hint}>Nota: Si deseas selección interactiva dentro de la app, instala un cliente personalizado (EAS) con <Text style={styles.mono}>react-native-maps</Text>.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 8 },
  label: { marginBottom: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  row: { flexDirection: 'row' },
  hint: { marginTop: 8, fontSize: 12, color: '#555' },
  mono: { fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier' },
});
