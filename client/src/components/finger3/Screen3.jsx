import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Scale, Lightbulb } from 'lucide-react-native';

export default function Screen3({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);

  const options = [
    'הבית הפיזי והמוכר',
    'פרטיות (זמן לעצמי, שקט)',
    'שגרה יציבה וצפויה',
    'הקהילה הפיזית שלי (השכנים, המכולת, הגינה)',
    'תחושת שליטה על הלו"ז',
    'אחר',
  ];

  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {/* כותרת עם אייקון */}
        <View style={styles.header}>
          <Scale size={32} color="#FD954E" style={{ marginTop: 4 }} />
          <Text style={styles.headerText}>למה המאזניים עדיין לא מאוזנים?</Text>
        </View>

        {/* הסבר */}
        <View style={[styles.card, styles.cardBorderGreen]}>
          <Text style={styles.text}>הסיבה לשחיקה ולתחושת הכובד היא לא רק הלחץ,</Text>
          <Text style={[styles.text, { color: '#FD954E', fontWeight: '600' }]}>
            אלא המשאבים שנלקחו ממך.
          </Text>
          <Text style={styles.text}>
            במצב הנוכחי (פינוי או חירום), איבדנו עוגנים שהחזיקו אותנו בשגרה.
          </Text>
        </View>

        {/* אפשרויות */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>סמן את מה שחסר לך כרגע:</Text>
          <View style={{ marginTop: 8 }}>
            {options.map((option, index) => {
              const isSelected = selected.includes(option);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleOption(option)}
                  style={[
                    styles.optionButton,
                    isSelected
                      ? styles.optionSelected
                      : styles.optionDefault,
                  ]}
                >
                  <View
                    style={[
                      styles.optionCircle,
                      isSelected
                        ? styles.optionCircleSelected
                        : styles.optionCircleDefault,
                    ]}
                  />
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* תובנה */}
        <View style={[styles.card, styles.cardBorderYellow]}>
          <View style={styles.insightHeader}>
            <Text style={styles.subtitle}>תובנה:</Text>
            <Lightbulb size={20} color="#FD954E" />
          </View>
          <Text style={styles.text}>
            "איבדת משאבים יקרים. הגירעון הזה מסביר בדיוק למה אתה מרגיש שחיקה. חייבים להביא כלים חדשים לארגז כדי לאזן את התמונה."
          </Text>
        </View>

        {/* כפתור הבא */}
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}> הבא</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    writingDirection: 'rtl', // RTL
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flexShrink: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    alignItems:'flex-start',
    textAlign:'right'
  },
  cardBorderGreen: {
    borderRightWidth: 4,
    borderRightColor: '#10B981',
  },
  cardBorderYellow: {
    borderRightWidth: 4,
    borderRightColor: '#FBBF24',
    backgroundColor: '#FBBF2433',
  },
  text: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'right',
    marginBottom: 4,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 8,
  },
  optionDefault: {
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  optionSelected: {
    borderColor: '#10B981',
    backgroundColor: '#10B98133',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
  },
  optionCircleDefault: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'white',
  },
  optionCircleSelected: {
    borderWidth: 2,
    borderColor: '#10B981',
    backgroundColor: '#10B981',
  },
  optionText: {
    fontSize: 16,
    color: '#1F2937',
    flexShrink: 1,
    textAlign: 'right',
  },
  insightHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#84C7DA',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
