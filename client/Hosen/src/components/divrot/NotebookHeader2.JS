import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { X, BookOpen } from "lucide-react-native";

interface NotebookHeaderProps {
  onClose?: () => void;
}

const NotebookHeader = ({ onClose }: NotebookHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {/* Close button */}
      {onClose && (
        <Pressable
          onPress={onClose}
          style={styles.closeButton}
        >
          <X style={styles.icon} />
        </Pressable>
      )}

      {/* Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <BookOpen style={styles.bookIcon} />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        עשרת הדברות למשפחה חסונה
      </Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>
        מבוסס על מדריך מרכז החוסן שדרות
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB", // Example for border color
  },
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6", // Light background for button
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    color: "#6B7280", // Text-muted color
  },
  iconContainer: {
    justifyContent: "center",
    marginBottom: 16,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#D1D5DB", // Background color for the icon
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A1A1AA", // Border color
  },
  bookIcon: {
    width: 32,
    height: 32,
    color: "#3B82F6", // Primary color for the icon
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937", // Primary text color
    fontFamily: "Rubik", // Custom font
  },
  subtitle: {
    textAlign: "center",
    color: "#6B7280", // Muted text color
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Rubik", // Custom font
  },
});

export default NotebookHeader;
