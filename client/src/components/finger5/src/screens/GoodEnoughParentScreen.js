import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenLayout from "../components/ScreenLayout";
import Button from "../components/ui/Button";
import { COLORS } from "../theme/colors";

const STORAGE_KEY = "selfcare-checklist";

export default function GoodEnoughParentScreen({ navigation }) {
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const items = JSON.parse(saved) || [];
          setCheckedCount(items.length || 0);
        }
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const handleFinish = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    navigation.navigate('Finger5Intro');
  };

  return (
 <View style ={{height:"100%",justifyContent:'space-between'}}>     
  <View style={styles.iconWrap}>
        <View style={styles.iconCircle}>
          <Text style={styles.heart}>💙</Text>
        </View>
      </View>

      <Text style={styles.title}>💪 אתם הורים טובים מספיק</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteTop}>זכרו!</Text>
        <Text style={styles.quoteText}>ילדים צריכים הורה מתפקד, לא הורה מושלם.</Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>✨ סיכום אישי</Text>

        {checkedCount > 0 ? (
          <Text style={styles.summaryText}>
            היום כבר הצלחתם לדאוג לעצמכם
            <Text style={{ fontWeight: "900", color: "#468488" }}> {checkedCount} פעמים</Text>.
            {"\n"}זה הדלק שלכם להמשך הדרך! 🌟
          </Text>
        ) : (
          <Text style={styles.summaryText}>
            גם אם לא הספקתם הכל, קחו כעת נשימה עמוקה אחת.{"\n"}זה הצעד הראשון. 🌱
          </Text>
        )}
      </View>

      <Button title="סיימתי את המדריך ✨" variant="warm" onPress={handleFinish} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: "center", marginBottom: 12 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: "rgba(113,166,116,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  heart: { fontSize: 34 },
  title: { fontSize: 24, fontWeight: "900", color: COLORS.text, textAlign: "center", marginBottom: 12 },
  quoteBox: {
    borderWidth: 2,
    borderColor: COLORS.accent,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    alignItems: "center",
  },
  quoteTop: { fontSize: 18, fontWeight: "900", color: COLORS.accent, marginBottom: 4 },
  quoteText: { fontSize: 16, fontWeight: "800", color: "#000", textAlign: "center" },
  summaryBox: {
    backgroundColor: "#D7F7F8",
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    textAlign:'right'
  },
  summaryTitle: { fontSize: 15, fontWeight: "900", color: COLORS.text, textAlign: "center", marginBottom: 8 },
  summaryText: { fontSize: 14.5, color: COLORS.text, textAlign: "center", lineHeight: 20 },
});
