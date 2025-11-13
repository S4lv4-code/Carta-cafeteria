import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import App from "./App/App";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}
