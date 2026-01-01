import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function Button({
  title,
  onPress,
  variant = "calm", // calm | warm | default
  disabled = false,
  style,
  textStyle,
  testID,
}) {
  const bg =
    variant === "warm" ? COLORS.warm : variant === "default" ? COLORS.primary : COLORS.accent;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, opacity: disabled ? 0.5 : pressed ? 0.9 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
