import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#8CA0B8"
      style={[styles.input, style, inputStyle]}
      textAlign="right"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#101824",
    borderColor: "#2A3340",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 18,
    color: "#E6EEF8",
  },
});
