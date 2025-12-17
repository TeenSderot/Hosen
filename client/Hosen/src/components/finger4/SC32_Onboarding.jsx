import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLayout from "../layout/AppLayout";
import PrincipleCard from "../ui/PrincipleCard";
import Button from "../ui/Button";

const principles = [
  { icon: "✅", title: "קצר וברור", description: "משפטים קצרים, בעיקר הוראות הפעלה." },
  { icon: "🧩", title: "אמת חלקית", description: "משתפים במה שצריך, לא בכל מה שמפחיד." },
  { icon: "💛", title: "מקום לרגש", description: 'מותר להגיד "אני קצת לחוץ", אבל להוסיף "אני יודע מה לעשות".' },
  { icon: "👏", title: "חיזוקים", description: "הילד התנהג יפה? תגידו לו! זה מחזק אותו." },
  { icon: "🤝", title: "מסר אחיד", description: "אבא ואמא משדרים אותו דבר (וגם סבתא)." },
  { icon: "🌤️", title: "אופטימיות", description: "לשדר שתכף המצב ישתפר." },
];

export default function SC32_Onboarding({ navigation }) {
  return (
    <AppLayout>
      <View style={styles.hero}>
        <Text style={styles.h1}>מילים בונות מציאות</Text>

        <Text style={styles.p}>
          ברגעי לחץ, המילים שלנו הן העוגן של הילדים. כשאנחנו לחוצים,
          קשה למצוא את המילים הנכונות.{"\n"}
          <Text style={styles.pStrong}>הכנו עבורכם עוגנים לשיח בונה ומרגיע.</Text>
        </Text>
      </View>

      <View style={styles.list}>
        {principles.map((p, idx) => (
          <View key={idx} style={{ marginBottom: 10 }}>
            <PrincipleCard icon={p.icon} title={p.title} description={p.description} />
          </View>
        ))}
      </View>

      <Button title="בואו נתחיל" onPress={() => navigation.navigate("Slogan")} />
    </AppLayout>
  );
}מ

const styles = StyleSheet.create({
  hero: { gap: 10, paddingVertical: 8 },
  h1: { color: "#E6EEF8", fontSize: 28, fontWeight: "900", textAlign: "center" },
  p: { color: "#AFC0D6", fontSize: 16, lineHeight: 22, textAlign: "center" },
  pStrong: { color: "#E6EEF8", fontWeight: "700" },
  list: { marginTop: 10, marginBottom: 14 },
});
