import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function ChecklistItem({ emoji, text, checked, onToggle, feedback }) {
  return (
    <Pressable
  onPress={onToggle}
  style={({ pressed }) => [
    styles.row,
    checked && styles.rowChecked,
    pressed && { opacity: 0.95 },
  ]}
>
  {/* צד ימין: צ'קבוקס + טקסט */}
  <View style={styles.rightContent}>
    <View style={[styles.dot, checked && styles.dotChecked]}>
      {checked ? <View style={styles.dotInner} /> : null}
    </View>
{/* צד שמאל: אימוג'י */}
  <View style={styles.emojiWrap}>
    <Text style={styles.emoji}>{emoji}</Text>
  </View>
  <View >
    <Text
      style={[
        styles.text,
        checked ? styles.textChecked : styles.textMuted,
      ]}
    >
      {text}
    </Text></View>
  </View>

  

  {checked ? (
    <Text style={styles.feedback} numberOfLines={1}>
      {feedback}
    </Text>
  ) : null}
</Pressable>
  );
}

const styles = StyleSheet.create({
 row: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingVertical: 14,
  paddingHorizontal: 14,
  borderBottomWidth: 1,
  borderBottomColor: "rgba(43,52,64,0.08)",
  backgroundColor: "#fff",
},

rightContent: {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 10,
  flex: 1,
},


text: {
  textAlign: "right",
  fontSize: 14,
  lineHeight: 20,
  flexShrink: 1,
},

emojiWrap: {
  width: 34,
  alignItems: "flex-start",
},

emoji: {
  fontSize: 22,
  textAlign: "left",
},
  rowChecked: {
    backgroundColor: "rgba(113,166,116,0.10)",
  },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(43,52,64,0.20)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  dotChecked: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  
  textMuted: { color: COLORS.muted },
  textChecked: { color: COLORS.text, fontWeight: "600" },
  
  feedback: {
    position: "absolute",
    left: 14,
    bottom: 8,
    fontSize: 12,
    color: COLORS.success,
    fontWeight: "600",
  },
});
