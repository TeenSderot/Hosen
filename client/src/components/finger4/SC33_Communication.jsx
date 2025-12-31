import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Divider from "../ui/Divider";

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
      "כל הכבוד לנו,עשינו דרך ארוכה והצלחנו .",
      "אנחנו נשארים ביחד כל הזמן.",
    ],
  },
  {
    key: "crisis",
    icon: "rainy-outline",
    label: "משבר",
    title: "מתמודדים עם קושי",
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
    phrases: ["אנחנו בבית שלנו.", "ייקח זמן להתרגל וזה בסדר."],
  },
];

export default function SC33_Communication({ navigation }) {
  const [activeTab, setActiveTab] = useState("leaving");
  const [checked, setChecked] = useState({});

  // טוען בחירות קיימות (אם יש)
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("checkedPhrases");
      if (saved) setChecked(JSON.parse(saved));

      const savedCat = await AsyncStorage.getItem("activeCategory");
      if (savedCat) setActiveTab(savedCat);
    })();
  }, []);

  // שומר כל שינוי (אופציונלי - נחמד)
  useEffect(() => {
    
    AsyncStorage.setItem("checkedPhrases", JSON.stringify(checked));
  }, [checked]);

  const toggleCheck = (text) => {
    setChecked((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const currentTab = tabs.find((t) => t.key === activeTab);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>מה אומרים עכשיו?</Text>

      <View style={styles.tabs}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons name={tab.icon} size={20} color={active ? "#fff" : "#666"} />
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{currentTab.title}</Text>
        {currentTab.tip ? <Text style={styles.tip}>💡 {currentTab.tip}</Text> : null}

        {currentTab.phrases.map((phrase, index) => (
          <View key={phrase} style={{ width: "100%" }}>
            <TouchableOpacity style={styles.checkItem} onPress={() => toggleCheck(phrase)}>
              
              <Text style={styles.checkText}>{phrase}</Text>
                <Ionicons
                name={checked[phrase] ? "radio-button-on" : "radio-button-off"}
                size={26}
                color="#898c8e"
              />
            </TouchableOpacity>

            {index < currentTab.phrases.length - 1 ? <Divider /> : null}
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={async () => {
          await AsyncStorage.setItem("activeCategory", activeTab);
          await AsyncStorage.setItem("checkedPhrases", JSON.stringify(checked));
          navigation.navigate("Dashboard");
        }}
      >
        <Text style={styles.doneText}>סיימתי – מעבר לסיכום</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    width: "100%",
    height:'100%',
    padding: 16,
    backgroundColor: "#F8F9FB",
    borderLeftColor: "#84C7DA",
    borderLeftWidth: 1,
    
    justifyContent:'space-between'
  },
  header: {
    padding: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    height: 80,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#EEE",
    justifyContent: "center",
  },
  tabActive: { backgroundColor: "#FD954E" },
  tabText: { fontSize: 14, marginTop: 4, color: "#666" },
  tabTextActive: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: "flex-start",
    paddingBottom: 30,
  },
  cardTitle: { fontSize: 26, fontWeight: "700", marginBottom: 12 },
  tip: { backgroundColor: "#FFF3CD", padding: 12, borderRadius: 10, marginBottom: 12 },
checkItem: {
  flexDirection: "row-reverse",
  alignItems: "center",
  marginBottom: 12,
  width: "100%",
},  checkText: {
  flex: 1,
  fontSize: 18,
  textAlign: "right",
  writingDirection: "rtl",
  alignSelf: "stretch",
},
  doneButton: { backgroundColor: "#FD954E", padding: 16, borderRadius: 30, alignItems: "center" },
  doneText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
