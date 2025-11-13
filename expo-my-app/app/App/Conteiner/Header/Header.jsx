
import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../theme";

export default function Header() {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.title1}>CAMPER CAFE</Text>
      <Text style={globalStyles.title2}>Est. 2020</Text>
    </View>
  );
}
