import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

/* --------- DATA --------- */

const tabs = [
  {
    key: "leaving",
    icon: "car-outline",
    label: "יוצאים",
    title: "בדרך החוצה",
    phrases: [
      "אנחנו עומדים לצאת מהבית ונעשה את זה הכי מהר שאפשר.",
      "אנחנו נשמור עליכם בדרך.",
      "היכנסו למכונית ושבו במקום בטוח.",
      "אנחנו נוסעים למקום בטוח.",
    ],
  },
  {
    key: "arrived",
    icon: "bed-outline",
    label: "הגענו",
    title: "התמקמות במקום בטוח",
    phrases: [
      "הגענו! אנחנו במקום בטוח.",
      "כל הכבוד לנו.",
      "אנחנו נשארים ביחד כל הזמן.",
    ],
  },
  {
    key: "crisis",
    icon: "rainy-outline",
    label: "משבר",
    title: "מתמודדים עם קושי",
    tip: "לא להגיד סתם ״יהיה בסדר״ – תנו מקום לקושי.",
    phrases: [
      "אני רואה שקשה לך.",
      "זה הגיוני להרגיש ככה.",
      "אנחנו משפחה חזקה.",
    ],
  },
  {
    key: "returning",
    icon: "home-outline",
    label: "חוזרים",
    title: "החזרה לשגרה",
    phrases: [
      "אנחנו בבית שלנו.",
      "ייקח זמן להתרגל וזה בסדר.",
    ],
  },
];

/* --------- COMPONENT --------- */

export default function Communication() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("leaving");
  const [checked, setChecked] = useState({});

  useEffect(() => {
    AsyncStorage.removeItem("checkedPhrases");
    setChecked({});
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("checkedPhrases", JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (text) => {
    setChecked((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const currentTab = tabs.find((t) => t.key === activeTab);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>מה אומרים עכשיו?</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={20}
                color={active ? "#fff" : "#666"}
              />
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{currentTab.title}</Text>

        {currentTab.tip && (
          <Text style={styles.tip}>💡 {currentTab.tip}</Text>
        )}

        {currentTab.phrases.map((phrase) => (
          <TouchableOpacity
            key={phrase}
            style={styles.checkItem}
            onPress={() => toggleCheck(phrase)}
          >
            <Ionicons
              name={
                checked[phrase] ? "checkbox-outline" : "square-outline"
              }
              size={24}
              color="#007AFF"
            />
            <Text style={styles.checkText}>{phrase}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => {
          AsyncStorage.setItem("activeCategory", activeTab);
          navigation.navigate("Dashboard");
        }}
      >
        <Text style={styles.doneText}>סיימתי – מעבר לסיכום</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* --------- STYLES --------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F8F9FB",
  },
  header: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#EEE",
  },
  tabActive: {
    backgroundColor: "#007AFF",
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: "#666",
  },
  tabTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  tip: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkText: {
    marginRight: 8,
    flex: 1,
    fontSize: 15,
  },
  doneButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
