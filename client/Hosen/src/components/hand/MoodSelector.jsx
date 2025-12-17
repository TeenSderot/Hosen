import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { COLORS } from "./COLORS";

export default function MoodSelector({ onMoodSelect }) {
  const [selected, setSelected] = useState(null);

  const moods = ["yellow", "cyan", "orange", "lime", "green"];

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <Pressable
          key={mood}
          onPress={() => {
            setSelected(mood);
            if (onMoodSelect) onMoodSelect(mood);
          }}
          style={[
            styles.circle,
            { backgroundColor: COLORS.mood[mood] },
            selected === mood && styles.selected,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 16,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 4,
  },
  selected: {
    transform: [{ scale: 1.1 }],
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
