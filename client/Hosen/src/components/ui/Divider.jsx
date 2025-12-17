import React from "react";
import { View, StyleSheet } from "react-native";

export default function Divider({ margin = 16 }) {
  return <View style={[styles.divider, { marginVertical: margin }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
});