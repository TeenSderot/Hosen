import { forwardRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import { COLORS } from "./COLORS";

export const Input = forwardRef((props, ref) => {
  return (
    <TextInput
      ref={ref}
      placeholderTextColor={COLORS.muted}
      style={styles.input}
      textAlign="right"
      writingDirection="rtl"
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.foreground,
    backgroundColor: COLORS.card,
  },
});
