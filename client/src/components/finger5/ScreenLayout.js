import React from "react";
import { SafeAreaView, View, StyleSheet, ScrollView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../finger5/theme/colors";

export default function ScreenLayout({ children, scroll = true }) {
  const Content = (
    <View style={styles.center}>
      <View style={styles.card}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      
        {scroll ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {Content}
          </ScrollView>
        ) : (
          Content
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1},
  bg: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
  },
  center: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    borderWidth: Platform.OS === "web" ? 1 : 0,
    borderColor: "rgba(43,52,64,0.10)",
  },
});
