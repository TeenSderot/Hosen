import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StressLevel, THEME, FONTS } from '../types';

const presetWeights = [
  { id: 'p1', text: 'שינוי בסביבת המגורים', category: 'physical' },
  { id: 'p2', text: 'קשיים לוגיסטיים', category: 'physical' },
  { id: 'p3', text: 'שיבוש בשינה/תזונה', category: 'physical' },
  { id: 'f1', text: 'היעדרות בן/ת זוג', category: 'family' },
  { id: 'f2', text: 'דאגה לשלום יקירים', category: 'family' },
  { id: 'f3', text: 'צפיפות וחיכוך בבית', category: 'family' },
  { id: 'e1', text: 'חוסר וודאות', category: 'emotional' },
  { id: 'e2', text: 'עומס המידע והחדשות', category: 'emotional' },
  { id: 'e3', text: 'חרדה ודריכות', category: 'emotional' },
  { id: 'e4', text: 'תחושת בדידות', category: 'emotional' },
];

export const Oct7WeightsScreen = ({ stressors, onAdd, onRemove, onNext }) => {
  const handleToggle = (text, category) => {
    const existing = stressors.find(s => s.text === text && s.type === 'emergency');
    if (existing) {
      onRemove(existing.id);
    } else {
      const newStressor = {
        id: Date.now().toString() + Math.random(),
        text: text,
        category: category,
        type: 'emergency',
        level: StressLevel.NORMAL
      };
      onAdd(newStressor);
    }
  };

  const isSelected = (text) => stressors.some(s => s.text === text && s.type === 'emergency');

  const renderSection = (title, category, color) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIndicator, { backgroundColor: color }]} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.buttonsRow}>
        {presetWeights.filter(w => w.category === category).map(w => {
          const selected = isSelected(w.text);
          return (
            <TouchableOpacity
              key={w.id}
              onPress={() => handleToggle(w.text, w.category)}
              style={[
                styles.presetButton,
                selected && { backgroundColor: `${color}30`, borderColor: color }
              ]}
            >
              <Text style={[
                styles.presetText,
                selected && { color: color, fontFamily: FONTS.bold }
              ]}>
                {selected && '✓ '}{w.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    // <LinearGradient
    //   colors={['#F9FAFB', '#FFF7ED']}
    //   style={styles.container}
    // >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>המשקולות של המצב</Text>
        <Text style={styles.subtitle}>
          מצבי חירום משבשים את השגרה ומביאים איתם עומסים חדשים. בחרו את מה שיושב עליכם כרגע.
        </Text>

        {renderSection('תנאים פיזיים', 'physical', THEME.orange)}
        {renderSection('משפחה וקשרים', 'family', THEME.blue)}
        {renderSection('רגשי', 'emotional', THEME.lime)}
     

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onNext}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>הוספתי את המשקולות שלי</Text>
        </TouchableOpacity>
      </View> </ScrollView>
   // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
    alignItems:'flex-start'
  },
  title: {
    fontSize: 26,
    fontFamily: FONTS.bold,
    color: THEME.blue,
    marginBottom: 8,
    textAlign: 'right',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#6B7280',
    marginBottom: 24,
    
  },
  section: {
    marginBottom: 24,
    alignItems:'flex-start'
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionIndicator: {
    width: 8,
    height: 24,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: '#374151',
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  presetText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#6B7280',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  nextButton: {
    backgroundColor: THEME.blue,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.bold,
    
    
  },
});
