import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

// PrincipleCard פשוט לריאקט נייטיב
const PrincipleCard = ({ icon, title, description, delay }) => {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
};

const principles = [
  { icon: "🎯", title: "קצר וברור", description: "משפטים קצרים, בעיקר הוראות הפעלה." },
  { icon: "🌗", title: "אמת חלקית", description: "משתפים במה שצריך, לא בכל מה שמפחיד." },
  { icon: "❤️", title: "מקום לרגש", description: 'מותר להגיד "אני קצת לחוץ", אבל להוסיף "אני יודע מה לעשות".' },
  { icon: "💪", title: "חיזוקים", description: "הילד התנהג יפה? תגידו לו! זה מחזק אותו." },
  { icon: "🤝", title: "מסר אחיד", description: "אבא ואמא משדרים אותו דבר (וגם סבתא)." },
  { icon: "☀️", title: "אופטימיות", description: "לשדר שתכף המצב ישתפר." },
];

const SC32_Onboarding = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>מילים בונות מציאות</Text>
        <Text style={styles.subtitle}>
          ברגעי לחץ, המילים שלנו הן העוגן של הילדים. כשאנחנו לחוצים, קשה למצוא את המילים הנכונות.
          {"\n"}
          <Text style={styles.subtitleHighlight}>
            הכנו עבורכם עוגנים לשיח בונה ומרגיע.
          </Text>
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {principles.map((p, idx) => (
          <PrincipleCard
            key={idx}
            icon={p.icon}
            title={p.title}
            description={p.description}
            delay={idx * 100} // ניתן להשתמש באנימציה עם ספרייה כמו react-native-reanimated
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Slogan")} // דומה ל-navigate("/slogan")
      >
        <Text style={styles.buttonText}>בואו נתחיל</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#F8F9FB",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#666",
    textAlign: "center",
  },
  subtitleHighlight: {
    color: "#000",
    fontWeight: "700",
  },
  cardsContainer: {
    marginVertical: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    backgroundColor: "#FD954E",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default SC32_Onboarding;
