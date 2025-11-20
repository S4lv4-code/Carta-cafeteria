import React from "react";
import { View, Text, Linking, StyleSheet } from "react-native";
import FooterMap from "./FooterMap";
import { PrimaryButton } from "../../components/Button";

export default function Footer() {
  const handlePress = () => {
    const url = "https://www.freecodecamp.org";
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  // Default coords can be replaced by a state/prop later
  const latitude = -34.6037;
  const longitude = -58.3816;

  return (
    <View style={styles.footer}>
      <View style={styles.topRow}>
        <Text style={styles.address}>Nuestra cafetería</Text>
        <PrimaryButton onPress={handlePress} style={styles.visitBtn}>Visitar sitio</PrimaryButton>
      </View>

      <FooterMap latitude={latitude} longitude={longitude} />

      <Text style={styles.small}>Dirección de ejemplo: 123 Free Code Camp Drive</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    padding: 12,
    width: '100%'
  },
  topRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  visitBtn: { minWidth: 120 },
  address: { fontWeight: '600' },
  small: { color: '#333', marginTop: 8 },
});
