import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenLayout from "../ScreenLayout";
import Button from "../ui/Button";
import ChecklistItem from "../ui/ChecklistItem";
import { COLORS } from "../theme/colors";

const STORAGE_KEY = "selfcare-checklist";

const checklistItems = [
  { id: "water", emoji: "💧", text: "שתיתי מים (ולא רק קפה).", feedback: "מצוין! הגוף מודה לך." },
  { id: "food", emoji: "🍎", text: "אכלתי לפחות ארוחה מסודרת אחת.", feedback: "מעולה. זה בסיס." },
  { id: "sleep", emoji: "😴", text: "נחתי רגע / ישנתי קצת.", feedback: "הסוללה נטענת." },
  { id: "talk", emoji: "🗣️", text: "דיברתי עם מישהו (אפילו דקה).", feedback: "שיתוף זה חמצן." },
  { id: "news", emoji: "📵", text: "הגבלתי חדשות / מסכים לכמה דקות.", feedback: "שקט עושה טוב." },
  { id: "breath", emoji: "🌬️", text: "עשיתי נשימה עמוקה אחת.", feedback: "זה נחשב! באמת." },
];

export default function SelfCareChecklistScreen({ navigation }) {
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setCheckedItems(JSON.parse(saved) || []);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const toggleItem = async (id) => {
    setCheckedItems((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  };

  const handleContinue = async () => {
    if (!checkedItems || checkedItems.length === 0) {
      Alert.alert("נא לסמן לפחות פעולה אחת", "סמנו מה הצלחתם לעשות היום לפני שממשיכים");
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    navigation.navigate("GoodEnoughParent");
  };

  const checkedCount = checkedItems.length;

  return (
    <View style ={{height:"100%",justifyContent:'space-between'}}>
      <Text style={styles.title}>🩺 בדיקת חמצן יומית</Text>

      <Text style={styles.subtitle}>
        סמנו מה הצלחתם לעשות היום — גם אם זה קטן.
      </Text>

      <View style={styles.progressBox}>
        <Text style={styles.progressText}>
          מסומן: <Text style={{ fontWeight: "900", color: COLORS.accent }}>{checkedCount}</Text>
        </Text>
      </View>

      <View style={styles.listWrap}>
        
        <View style={styles.listCard}>
          {checklistItems.map((item, idx) => (
            <ChecklistItem
              key={item.id}
              emoji={item.emoji}
              text={item.text}
              feedback={item.feedback}
              checked={checkedItems.includes(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
          
        </View>
        {/* <View style={styles.yellowBar} /> */}
      </View>

      <View style={{ height: 14 }} />

      <Button title="סיימתי לסמן, אפשר להמשיך" variant="calm" onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {marginTop:16, fontSize: 24, fontWeight: "900", color: COLORS.text, textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14.5, color: COLORS.muted, textAlign: "center", lineHeight: 20, marginBottom: 14 },
  progressBox: {
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(43,52,64,0.10)",
    backgroundColor: "rgba(132,199,218,0.12)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 14,
    
  },
  progressText: { color: COLORS.text, fontWeight: "700" },
  listWrap: { flexDirection: "row-reverse", borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(43,52,64,0.10)" },
  yellowBar: { width: 12, backgroundColor: "#F9F081" },
  listCard: { flex: 1, backgroundColor: "#fff",textAlign:'right' },
});
