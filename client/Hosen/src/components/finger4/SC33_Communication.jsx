import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Divider from "./ui/Divider";
import { useNavigation } from "@react-navigation/native";

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

      {currentTab.phrases.map((phrase, index) => (
  <View key={phrase} style={{ width: "100%" }}>
    <TouchableOpacity
      style={styles.checkItem}
      onPress={() => toggleCheck(phrase)}
    >
      <Ionicons
        name={checked[phrase] ? "radio-button-on" : "radio-button-off"}
        size={26}
        color="#898c8e"
      />
      <Text style={styles.checkText}>{phrase}</Text>
    </TouchableOpacity>

    {/* 🔽 DIVIDER בין איברים (לא אחרי האחרון) */}
    {index < currentTab.phrases.length - 1 && (
      <Divider />
    )}
  </View>
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
    paddingTop:120,
    width: "100%",
    padding: 16,
    backgroundColor: "#F8F9FB",
    borderLeftColor: "#84C7DA",
    borderLeftWidth: 1,
   
  },
  header: {
     padding:10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
   
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
     flexDirection: "row-reverse",
     height:'80',
      paddingBottom:10
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
  tabActive: {
    backgroundColor: "#FD954E",
  },
  tabText: {
    fontSize: 14,
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
    alignItems:"flex-end",
    paddingBottom:30
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
  },
  tip: {
    backgroundColor: "#FFF3CD",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    breaWord: "break-word",
    direction: "rtl",
  },
  checkItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 12,
  },
  checkText: {
    textAlign: "right",
    marginRight: 8,
    flex: 1,
    fontSize: 18,
  },
  doneButton: {
    backgroundColor: "#FD954E",
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
