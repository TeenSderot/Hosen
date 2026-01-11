import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import ScreenLayout from "../ScreenLayout";
import Button from "../ui/Button";
import { COLORS } from "../theme/colors";

const steps = [
  {
    number: 1,
    title: "לזהות את הסימנים",
    description: "שימו לב לגוף שלכם - עייפות, כאבי ראש, קושי להתרכז הם סימנים שהגיע הזמן לעצור.",
  },
  {
    number: 2,
    title: "לתת לעצמכם רשות",
    description: "דקה לנשום, כוס קפה בשקט, שיחה עם חבר - כל אלה לגיטימיים ונחוצים.",
  },
  {
    number: 3,
    title: "לתכנן טעינות",
    description: "בדיוק כמו סוללה: טוענים קצת כל יום, לא מחכים לקריסה.",
  },
  {
    number: 4,
    title: "להיות הורה 'טוב מספיק'",
    description: "ילדים צריכים הורה מתפקד, לא הורה מושלם. אתם כבר עושים מעל ומעבר.",
  },
];

export default function WhoSavesTheSaviorScreen({ navigation }) {
  return (
    <ScreenLayout>
      <View style={styles.header}>
        {/* <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>חזרה</Text>
          <Text style={styles.backArrow}>➡️</Text>
        </Pressable> */}

        <View style={styles.shield}>
          <Text style={{ fontSize: 14, fontWeight: "900", color: "#fff" }}>🛡️</Text>
        </View>
      </View>

      <Text style={styles.title}>מי יציל את המציל?</Text>

      <Text style={styles.subtitle}>
        כהורים, אנחנו תמיד דואגים לכולם.{"\n"}אבל מי דואג לנו?
      </Text>

      <View style={{ marginBottom: 16 }}>
        {steps.map((s) => (
          <View key={s.number} style={styles.stepRow}>
            
            <View style={{ flex: 1, alignItems: "flex-start", }}>
              <Text style={styles.stepTitle}>{s.title}</Text>
              <Text style={styles.stepDesc}>{s.description}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{s.number}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sep} />

      <View style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          💡 זכרו: ילדים לא צריכים הורה מושלם.{"\n"}הם צריכים אתכם — יציבים ונושמים.
        </Text>
      </View>

      <Button
        title="בואו נתחיל"
        variant="warm"
        onPress={() => navigation.navigate("RechargeChecklist")}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  backBtn: { flexDirection: "row-reverse", alignItems: "center", gap: 6, paddingVertical: 4, paddingHorizontal: 6 },
  backText: { color: COLORS.muted, fontSize: 14, fontWeight: "600" },
  backArrow: { fontSize: 16 },
  shield: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "900", color: COLORS.text, textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 14.5, color: COLORS.muted, textAlign: "center", lineHeight: 20, marginBottom: 12 },
  stepRow: { flexDirection: "row-reverse", gap: 12, alignItems: "flex-start",textAlign:'right', marginBottom: 12 },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: COLORS.warm,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
    textAlign:'right'
  },
  badgeText: { color: "#fff", fontWeight: "900" },
  stepTitle: { fontSize: 15, fontWeight: "800", color: COLORS.text, textAlign: "right", marginBottom: 2 },
  stepDesc: { fontSize: 13.5, color: COLORS.muted, textAlign: "left", lineHeight: 20 },
  sep: { height: 3, backgroundColor: COLORS.primary, borderRadius: 999, marginVertical: 14, opacity: 0.8 },
  highlightBox: { backgroundColor: "rgba(209,227,143,0.35)", borderRadius: 18, padding: 14, marginBottom: 16 },
  highlightText: { textAlign: "center", color: COLORS.text, fontWeight: "700", lineHeight: 20 },
});
