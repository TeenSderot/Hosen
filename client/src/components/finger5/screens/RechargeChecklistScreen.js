import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button from "../ui/Button";
import { COLORS } from "../theme/colors";

const tips = [
  { emoji: "🍕", title: "צרכים בסיסיים", description: "לא לדלג על ארוחות, לשתות מים (לא רק קפה!)." },
  { emoji: "🤝", title: "לבקש עזרה", description: "לא לעשות הכל לבד. למדו לבזר סמכויות." },
  { emoji: "🗣️", title: "לדבר", description: "לשתף רגשות. גם משפט קצר יכול לפרוק עומס." },
  { emoji: "🧠", title: "מינון חדשות", description: "להגביל חשיפה. אתם לא חייבים להיות מעודכנים כל דקה." },
  { emoji: "🌙", title: "שינה", description: "גם תנומת 15 דקות היא טעינה. כל מה שאפשר." },
];

export default function RechargeChecklistScreen({ navigation }) {
  return (
    <ScrollView>
      <Text style={styles.title}>⚡ טעינת כוחות</Text>

      <Text style={styles.subtitle}>
        כמה כללי אצבע פשוטים שיעזרו לכם לשמור על הכוחות
      </Text>

      <View style={styles.box}>
        <Text style={styles.boxText}>
          לא חייבים לעשות הכל. גם דבר אחד קטן שעשיתם למען עצמכם –{" "}
          <Text style={{ fontWeight: "800", color: COLORS.accent }}>זה כבר ניצחון.</Text>
        </Text>
      </View>

      <View style={{ marginBottom: 18 }}>
        {tips.map((tip, idx) => (
          <View key={tip.title} style={styles.tipRow}>
            <View style={{ flex: 1,  alignItems: "flex-start" }}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipDesc}>{tip.description}</Text>
            </View>
            <View style={styles.tipEmojiBox}>
              <Text style={styles.tipEmoji}>{tip.emoji}</Text>
            </View>
          </View>
        ))}
      </View>

      <Button
        title="הבנתי, מה הלאה?"
        variant="calm"
        onPress={() => navigation.navigate("SelfCareChecklist")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "900", color: COLORS.text, textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.muted, textAlign: "center", marginBottom: 14, lineHeight: 20 },
  box: {
    borderWidth: 2,
    borderColor: "#A8DBDE",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
  },
  boxText: { fontSize: 14.5, color: COLORS.text, textAlign: "center", lineHeight: 22 },
  tipRow: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "flex-end",
    justifyContent:'center',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(43,52,64,0.10)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    textAlign:'right'
  },
  tipEmojiBox: {
    flexDirection: "row-reverse",
    gap: 12,
    alignItems: "flex-end",
    justifyContent:'center',
    backgroundColor: "#fff",
 
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
    textAlign:'right'
  },
  tipEmoji: { fontSize: 26, width: 34, textAlign: "center" },
  tipTitle: {fontSize: 15, fontWeight: "800", color: COLORS.text, textAlign: "right", marginBottom: 2 },
  tipDesc: { fontSize: 13.5, color: COLORS.muted, textAlign: "right", lineHeight: 20 },
});
