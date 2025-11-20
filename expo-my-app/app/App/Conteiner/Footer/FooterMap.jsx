import React from 'react';
import { View, Platform, StyleSheet, Text, Linking } from 'react-native';
import { PrimaryButton } from '../../components/Button';

let WebView;
try {
  // optional import; if not installed, we'll fallback to opening external maps
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  WebView = require('react-native-webview').WebView;
} catch (e) {
  WebView = null;
}

export default function FooterMap({ latitude = -34.6037, longitude = -58.3816 }) {
  const src = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  function openExternal() {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) => console.warn('No se pudo abrir Maps:', err));
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <div style={{ width: '100%', height: 220 }}>
          <iframe
            title="map"
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: 8 }}
            loading="lazy"
          />
        </div>
        <View style={styles.row}>
          <PrimaryButton onPress={openExternal}>Abrir en Maps</PrimaryButton>
        </View>
      </View>
    );
  }

  // Native platforms: try WebView first
  if (WebView) {
    return (
      <View style={styles.container}>
        <View style={styles.webviewWrap}>
          <WebView source={{ uri: src }} style={styles.webview} />
        </View>
        <View style={styles.row}>
          <PrimaryButton onPress={openExternal}>Abrir en Maps</PrimaryButton>
        </View>
      </View>
    );
  }

  // Fallback: show coords and button to open external map
  return (
    <View style={styles.container}>
      <Text style={styles.coords}>Lat: {latitude.toFixed(6)}  Lon: {longitude.toFixed(6)}</Text>
      <View style={styles.row}>
        <PrimaryButton onPress={openExternal}>Abrir en Maps</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', marginTop: 8 },
  webviewWrap: { width: '100%', height: 220, borderRadius: 8, overflow: 'hidden' },
  webview: { flex: 1 },
  row: { marginTop: 8, width: '100%', alignItems: 'center' },
  coords: { color: '#333' },
});
