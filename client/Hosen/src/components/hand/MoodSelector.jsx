import React, { use, useState } from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";
import { COLORS } from "./COLORS";
import { useNavigation } from "@react-navigation/native";

export default function MoodSelector({ onMoodSelect }) {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  // הוספנו את ה-require ישירות לכל אייקון
  const moods = [
    { color: "yellow", icon: require('../../../assets/yellow.png') ,nav:()=>navigation.navigate('')}, 
    { color: "cyan",   icon: require('../../../assets/cyan.png'),nav:()=>navigation.navigate('pinky') }, 
    { color: "orange", icon: require('../../../assets/orange.png') ,nav:()=>navigation.navigate('middle')}, 
    { color: "lime",   icon: require('../../../assets/lime.png') ,nav:()=>navigation.navigate('index')}, 
    { color: "green",  icon: require('../../../assets/green.png') ,nav:()=>navigation.navigate('')}
  ];

  return (
    <View style={styles.container}>
      {moods.map((mood) => (
        <Pressable
          key={mood.color}
         onPress={() => {
          setSelected(mood.color);
          if (onMoodSelect) onMoodSelect({ color: mood.color, icon: mood.icon });
          
          // הוסף את השורה הזו:
          if (mood.nav) mood.nav(); 
        }}
          style={[
            styles.circle,
            { backgroundColor: COLORS.mood[mood.color] },
            selected === mood.color && styles.selected, // שים לב: השווינו ל-mood.color
          ]}
        >
          {/* עכשיו mood.icon הוא כבר ה-require המוכן */}
          <Image source={mood.icon} style={styles.icon} />
        </Pressable>
      ))}
    </View>
  );
}

// ... שאר הקוד שלך נשאר זהה

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 16,
  },
  circle: {
    width: 50,           // הגדלתי מעט כדי שיהיה נוח ללחוץ
    height: 50,
    borderRadius: 25,
    elevation: 4,
    // --- אלו השורות שחסרו לך למרכוז ---
    justifyContent: "center", 
    alignItems: "center",
    overflow: "hidden",  // מבטיח שהתמונה לא תצא מהעיגול
  },
  icon: {
    width: "70%",        // התמונה תתפוס 70% מהעיגול (משאיר מרווח שוליים)
    height: "70%",
    resizeMode: "contain", // שומר על פרופורציות האייקון בלי למרוח אותו
  },
  // selected: {
  //   transform: [{ scale: 1.2 }], // הגדלה קצת יותר משמעותית בבחירה
  //   borderWidth: 3,
  //   borderColor: "white",        // מסגרת לבנה בדרך כלל נראית טוב יותר על צבעים
  //   shadowColor: "#000",         // צל לאייפון
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  // },
});