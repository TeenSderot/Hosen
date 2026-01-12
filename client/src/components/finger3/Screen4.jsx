import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function Screen4({ onNext, onBack }) {
  const [selected, setSelected] = useState([]);

  const options = [
    'רכב פרטי / ניידות',
    'הכנסה שנכנסת (גם אם חלקית)',
    'בריאות פיזית סבירה (שלי ושל המשפחה)',
    'תקווה / אמונה בטוב, באלוהים, בעצמי',
    'זוגיות מתפקדת / שותף לדרך',
    'חברים זמינים (גם בטלפון)',
    'מכשירים נחוצים (לפטופ, סמארטפון תקין)',
    'קורת גג יציבה',
    'משפחה תומכת',
    'מיומנויות מקצועיות / השכלה',
    'חיסכון / רזרבה כלכלית',
    'בריאות נפשית סבירה',
    'קהילה / שייכות חברתית',
    'חופש לקבל החלטות',
  ];

  const toggleOption = (option) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {/* כרטיס הסבר */}
        <View style={[styles.card, { marginTop: 16 }]}>
          <Text style={styles.cardTitle}>המשאבים ה"שקופים" שלך</Text>
          <Text style={styles.cardText}>
            לפעמים אנחנו שוכחים את מה שכן יש לנו. אלו המשאבים הבסיסיים, ה"שקופים", שאם לא היו לנו - המצב היה קשה הרבה יותר.
          </Text>
        </View>

        {/* תמונה */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/scale_wins.png')} // path מתאים לקובץ שלך
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* אפשרויות */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>
            סמן כל משאב שזמין לך כרגע (גם אם באופן חלקי):
          </Text>

          <View style={{ marginTop: 8 }}>
            {options.map((option, index) => {
              const isSelected = selected.includes(option);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleOption(option)}
                  style={[
                    styles.optionButton,
                    isSelected ? styles.optionSelected : styles.optionDefault,
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
    backgroundColor: 'white',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    writingDirection: 'rtl',
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
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 180,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'left',
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
    borderColor: '#71A674',
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
    borderColor: '#71A674',
    backgroundColor: '#71A674',
  },
  optionText: {
    fontSize: 14,
    color: '#1F2937',
    flexShrink: 1,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#84C7DA',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
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
