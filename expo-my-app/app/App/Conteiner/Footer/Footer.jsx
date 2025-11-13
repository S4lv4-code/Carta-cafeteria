import React from "react";
import { View, Text, Linking, StyleSheet, TouchableOpacity } from "react-native";

export default function Footer() {
  const handlePress = () => {
    const url = "https://www.freecodecamp.org";
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>Visit our website</Text>
      </TouchableOpacity>
      <Text style={styles.address}>123 Free Code Camp Drive</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    padding: 16,
  },
  link: {
    color: "#000000ff",
    textDecorationLine: "underline",
    marginBottom: 8,
  },
  address: {
    color: "#333",
  },
});
