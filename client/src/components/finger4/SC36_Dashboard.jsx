import React, { useMemo, useState, useCallback } from "react";
import { Alert, Share, StyleSheet, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import AppLayout from "../layout/AppLayout";
import Button from "../ui/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const categoryLabels = {
  leaving: "יוצאים לדרך",
  arrived: "הגענו למקום",
  crisis: "מתמודדים עם קושי",
  returning: "חוזרים הביתה",
};

const phrasesToCategory = {
  '"אנחנו עומדים לצאת מהבית ונעשה את זה הכי מהר שאפשר."': "leaving",
  '"אנחנו נשמור עליכם בדרך למכונית/לאוטובוס."': "leaving",
  '"היכנסו למכונית ושבו על הרצפה/בכיסא – זה הכי בטוח עכשיו."': "leaving",
  '"חיילים מלווים אותנו בדרך ושומרים עלינו."': "leaving",
  '"אנחנו נוסעים למקום בטוח ונעים יותר."': "leaving",
  '"הגענו! אנחנו במקום בטוח."': "arrived",
  '"כל הכבוד לנו, עשינו דרך ארוכה והצלחנו."': "arrived",
  '"בואו נסדר את החדר/הפינה שלנו שיהיה לנו נעים."': "arrived",
  '"אנחנו נשארים ביחד כל הזמן."': "arrived",
  '"אם אתם צריכים משהו, תגידו לנו מיד."': "arrived",
  '"אני רואה שקשה לך, זה הגיוני להרגיש ככה."': "crisis",
  '"זה קשה להיות רחוק מהבית, אבל עכשיו זה המקום הכי בטוח."': "crisis",
  '"אל תשמרו בבטן – ספרו לנו מה אתם מרגישים."': "crisis",
  '"אנחנו גאים בכם מאוד על איך שאתם מתמודדים."': "crisis",
  '"אנחנו משפחה חזקה, אנחנו נמצא פתרון ביחד."': "crisis",
  '"אנחנו בבית שלנו, דברים מתקדמים לטובה."': "returning",
  '"ייקח קצת זמן להתרגל חזרה, וזה בסדר גמור."': "returning",
  '"אנחנו נסדר ונתקן את הבית והוא יהיה נעים כמו קודם."': "returning",
  '"כל אחד חוזר לשגרה בקצב שלו."': "returning",
};

const normalize = (s) => String(s).trim().replace(/^"+|"+$/g, "");
const phrasesToCategoryClean = Object.fromEntries(
  Object.entries(phrasesToCategory).map(([k, v]) => [normalize(k), v])
);

export default function SC36_Dashboard({ navigation }) {
  const [slogan, setSlogan] = useState("אנחנו משפחה חזקה");
  const [selectedPhrases, setSelectedPhrases] = useState({});

  const load = useCallback(async () => {
      const text = await AsyncStorage.getItem("checkedPhrases");
       setSelectedPhrases(JSON.parse(text) || {});

    // try {
    //   const savedActiveCategory = await AsyncStorage.getItem("activeCategory");
    //   if (savedActiveCategory) setActiveCategory(savedActiveCategory);

    //   const savedSlogan = await AsyncStorage.getItem("familySlogan");
    //   if (savedSlogan) setSlogan(savedSlogan);

    //   const savedChecked = await AsyncStorage.getItem("checkedPhrases");

    //   if (savedChecked) {
    //     const checked = JSON.parse(savedChecked);
    //     const organized = {};

    //     Object.entries(checked).forEach(([phrase, isChecked]) => {
    //       if (!isChecked) return;

    //       const cleanPhrase = normalize(phrase);
    //       const category = phrasesToCategoryClean[cleanPhrase];
    //       if (!category) return;

    //       if (!organized[category]) organized[category] = [];
    //       organized[category].push(cleanPhrase);
    //     });

    //     setSelectedPhrases(organized);
    //   } else {
    //     setSelectedPhrases({});
    //   }
    // } catch (e) {
    //   console.log("AsyncStorage error:", e);
    //   setSelectedPhrases({});
    // }
  }, []);

  // נטען כל פעם שנכנסים למסך
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const hasSelectedPhrases = useMemo(() => {
    return Object.values(selectedPhrases).some((arr) => (arr || []).length > 0);
  }, [selectedPhrases]);

  const handleShare = async () => {
    let shareText = `🛡️ הכוח שלנו: ${slogan}\n\n`;
    shareText += "📝 מה אומרים?\n\n";

    Object.entries(selectedPhrases).forEach(([category, phrases]) => {
      if (phrases && phrases.length > 0) {
        shareText += `${categoryLabels[category] || category}:\n`;
        phrases.forEach((phrase) => {
          shareText += `• ${phrase}\n`;
        });
        shareText += "\n";
      }
    });

    try {
      await Share.share({ message: shareText });
    } catch (e) {
      await Clipboard.setStringAsync(shareText);
      Alert.alert("הועתק", "הטקסט הועתק ללוח");
    }
  };

  return (
    <View style={{justifyContent:'space-between',height:"100%",alignItems:'center'}}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🛡️</Text>
        <Text style={styles.h1}>הערכה המוכנה שלכם</Text>
        {/* {activeCategory ? <Text style={{ color: "#6B7C93" }}>{activeCategory}</Text> : null} */}
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroLabel}>הכוח שלנו:</Text>
        <Text style={styles.heroTitle}>{slogan}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>📝 מה אומרים?</Text>
      </View>

     
      {Object.entries(selectedPhrases).some(([_, value]) => value) ? (
        Object.entries(selectedPhrases)
          .filter(([_, value]) => value === true)
          .map(([key], idx) => (
            <Text key={idx} style={styles.phrase}>
              {key}
            </Text>
          ))
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            טרם נבחרו משפטים - חזרו לתפריט לבחירה
          </Text>
        </View>
      )}


      <View style={{ gap: 10, marginTop: 14 }}>
        <Button style={{ backgroundColor: "#FD954E",paddingHorizontal:"50" ,color:"white"}} title="שתף בוואטסאפ המשפחתי" onPress={handleShare} />
        <Button
          title="חזרה למסך הבית"
          onPress={() => navigation.navigate("Hand")}
          style={{
            color: "#1E2C41",
            backgroundColor: "white",
            borderColor: "#7f8997ff",
            borderWidth: 1,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", paddingVertical: 6, gap: 6 },
  headerIcon: { fontSize: 28 },
  h1: { color: "#0F1D33", fontSize: 22, fontWeight: "900" },
  hero: {
    backgroundColor: "#0F1D33",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#84C7DA",
    marginVertical: 10,
  },
  heroLabel: { color: "#AFC0D6", fontSize: 13 },
  heroTitle: { color: "#E6EEF8", fontSize: 22, fontWeight: "900", marginTop: 6, textAlign: "center" },
  sectionHeader: { marginTop: 6, marginBottom: 8 },
  sectionTitle: { color: "#1E2C41", fontSize: 18, fontWeight: "900", textAlign: "right" },
  block: {
    backgroundColor: "#101824",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#233043",
    marginBottom: 10,
  },
  blockLabel: { color: "#AFC0D6", fontSize: 12, fontWeight: "800", textAlign: "right", marginBottom: 10 },
  phrase: {
    color: "#233043",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    paddingRight: 10,
    alignSelf:'center',
    marginStart:30,
    marginEnd:30
  },
  empty: {
    backgroundColor: "#111A27",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#233043",
  },
  emptyText: { color: "#AFC0D6", textAlign: "center" },
});
