import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const suggestions = ["ביחד ננצח", "משפחה חזקה", "אנחנו צוות", "יש בנו כוח"];

const SC35_Slogan = ({ navigation }) => {
  const [slogan, setSlogan] = useState("");

  const handleSave = async () => {
    await AsyncStorage.setItem("familySlogan", slogan || "אנחנו משפחה חזקה");
    navigation.navigate("Communication");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🛡️</Text>
        <Text style={styles.title}>הכוח המשפחתי שלנו</Text>
        <Text style={styles.subtitle}>
          בחרו משפט אחד, קצר וחזק, שילווה אתכם.{"\n"}
          משהו שרק אתם מבינים ונותן לכם כוח.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={slogan}
          onChangeText={setSlogan}
          placeholder={`לדוגמה: "משפחת כהן לא מוותרת", "אנחנו צוות מנצח"`}
          style={styles.input}
          textAlign="center"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.suggestionsContainer}>
        {suggestions.map((s) => (
          <TouchableOpacity
            key={s}
            style={styles.suggestionButton}
            onPress={() => setSlogan(s)}
          >
            <Text style={styles.suggestionText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style = {{height:"25%",justifyContent:'flex-end'}}>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>שמור סיסמה</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F8F9FB",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#666",
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    fontSize: 18,
    height: 48,
    color: "#000",
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  suggestionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#EEE",
    borderWidth: 1,
    borderColor: "#DDD",
    margin: 4,
  },
  suggestionText: {
    fontSize: 14,
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#84C7DA",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default SC35_Slogan;
