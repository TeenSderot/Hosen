import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function Screen5({ onNext, onBack }) {
  const [selectedHidden, setSelectedHidden] = useState([]);
  const [selectedMissing, setSelectedMissing] = useState([]);

  const hiddenOptions = [
    'עומס בעבודה/פרנסה',
    'מטלות בית',
    'זוגיות',
    'ניהול תקציב',
    'מצב בריאותי',
  ];

  const missingOptions = [
    'צפיפות בדירה/מלון',
    'חרדה ביטחונית',
    'חוסר וודאות',
    'מילואים',
    'דאגה לשלום הילדים',
  ];

  const toggleHidden = (option) => {
    setSelectedHidden(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const toggleMissing = (option) => {
    setSelectedMissing(prev =>
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {/* כותרת */}
        <Text style={styles.title}>מה יושב לך על הלב?</Text>
        <Text style={styles.subtitle}>המאזניים שלך נוטים בחדות. זה לא קורה סתם.</Text>
        <Text style={styles.subtitleMedium}>תראה עם מה אתה מתמודד כרגע:</Text>

        {/* לחצי שגרה */}
        <View style={[styles.card, { borderColor: '#F97316' }]}>
          <Text style={styles.cardHeader}>לחצי השגרה שלא נעלמו</Text>
          <Text style={styles.cardSubtext}>עומסים יומיומיים שממשיכים להעיק</Text>

          {hiddenOptions.map((option, index) => {
            const isSelected = selectedHidden.includes(option);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => toggleHidden(option)}
                style={[
                  styles.optionButton,
                  isSelected
                    ? { borderColor: '#F97316', backgroundColor: '#F9731633' }
                    : { borderColor: '#D1D5DB', backgroundColor: 'white' },
                ]}
              >
                <View
                  style={[
                    styles.optionCircle,
                    isSelected
                      ? { borderColor: '#F97316', backgroundColor: '#F97316' }
                      : { borderColor: '#D1D5DB', backgroundColor: 'white' },
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* לחצי חירום */}
        <View style={[styles.card, { borderColor: '#3B82F6' }]}>
          <Text style={styles.cardHeader}>לחצי החירום והמצב</Text>
          <Text style={styles.cardSubtext}>אתגרים ייחודיים לתקופה הזו</Text>

          {missingOptions.map((option, index) => {
            const isSelected = selectedMissing.includes(option);
            return (
              <TouchableOpacity
                key={index}
                onPress={() => toggleMissing(option)}
                style={[
                  styles.optionButton,
                  isSelected
                    ? { borderColor: '#3B82F6', backgroundColor: '#3B82F633' }
                    : { borderColor: '#D1D5DB', backgroundColor: 'white' },
                ]}
              >
                <View
                  style={[
                    styles.optionCircle,
                    isSelected
                      ? { borderColor: '#3B82F6', backgroundColor: '#3B82F6' }
                      : { borderColor: '#D1D5DB', backgroundColor: 'white' },
                  ]}
                />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* תובנה */}
        <View style={[styles.card, { borderColor: '#FACC15', backgroundColor: '#FACC1533' }]}>
          <Text style={styles.cardHeader}>כף הלחצים עמוסה.</Text>
          <Text style={styles.cardText}>כשאין מספיק משקל נגד בצד השני -</Text>
          <Text style={styles.cardText}>אנחנו בסכנת קריסה.</Text>
          <Text style={[styles.cardText, { color: '#10B981', fontWeight: '600' }]}>בוא נבדוק מה מחזיק אותך.</Text>
        </View>

        {/* כפתור הבא */}
        <TouchableOpacity
          style={[
            styles.button,
            selectedHidden.length === 0 ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
          disabled={selectedHidden.length === 0}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>נבדוק מה מחזק אותך</Text>
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 4,
    color: '#1F2937',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 2,
  },
  subtitleMedium: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 4,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems:'flex-start'
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  cardSubtext: {
    fontSize: 13,
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'right',
  },
  cardText: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'right',
  },
  optionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 6,
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 8,
  },
  optionText: {
    fontSize: 14,
    flexShrink: 1,
    textAlign: 'right',
    color: '#1F2937',
  },
  button: {
    paddingVertical: 16,
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
  buttonEnabled: {
    backgroundColor: '#3B82F6',
  },
  buttonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
