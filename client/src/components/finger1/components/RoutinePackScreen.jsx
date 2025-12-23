import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Plus, Briefcase, Home, Baby } from 'lucide-react-native';
import { StressLevel, THEME, FONTS } from '../types';
import { SunVisualization } from './SunVisualization';

const PRESETS = {
  work: [
    'מיילים דחופים', 'ישיבות צוות', 'דדליין לפרויקט',
    'שיחות עם הבוס', 'נסיעות לעבודה', 'משמרות כפולות',
    'הגשת דוחות', 'ניהול עובדים', 'חיפוש עבודה'
  ],
  home: [
    'ניקיון וסדר', 'כביסות', 'קניות לסופ"ש',
    'בישולים', 'תשלום חשבונות', 'תיקונים בבית',
    'טיפול ברכב', 'סידור ארונות', 'שטיפת כלים'
  ],
  family: [
    'הסעות לחוגים', 'שיעורי בית', 'זמן איכות',
    'ארוחות משפחתיות', 'מקלחות והשכבה', 'ביקור הורים',
    'טיפול רפואי', 'ימי הולדת', 'מריבות בין אחים'
  ]
};

export const RoutinePackScreen = ({ stressors, onAdd, onRemove, onNext }) => {
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('family');

  const categories = [
    { id: 'family', label: 'משפחה', Icon: Baby },
    { id: 'home', label: 'בית', Icon: Home },
    { id: 'work', label: 'עבודה', Icon: Briefcase },
  ];

  const handleToggle = (text) => {
    if (!text.trim()) return;

    const existing = stressors.find(s => s.text === text && s.type === 'routine');
    if (existing) {
      onRemove(existing.id);
    } else {
      const newStressor = {
        id: Date.now().toString() + Math.random().toString(),
        text: text,
        category: selectedCategory,
        type: 'routine',
        level: StressLevel.NORMAL
      };
      onAdd(newStressor);
    }
    setInputText('');
  };

  const isSelected = (text) => stressors.some(s => s.text === text && s.type === 'routine');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>התיק של השגרה</Text>
        <Text style={styles.subtitle}>
          מה מעסיק אותך ביום-יום? לחץ על הקטגוריות ובחר, או הוסף משלך.
        </Text>

        <View style={styles.categoryTabs}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={[
                styles.categoryTab,
                selectedCategory === cat.id && styles.categoryTabActive
              ]}
            >
              <cat.Icon size={20} color={selectedCategory === cat.id ? THEME.blue : '#6B7280'} />
              <Text style={[
                styles.categoryTabText,
                selectedCategory === cat.id && styles.categoryTabTextActive
              ]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.presetsGrid}>
          {PRESETS[selectedCategory]?.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleToggle(item)}
              style={[
                styles.presetButton,
                isSelected(item) && styles.presetButtonSelected
              ]}
            >
              <Text style={[
                styles.presetText,
                isSelected(item) && styles.presetTextSelected
              ]}>
                {isSelected(item) ? '✓ ' : '+ '}{item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>משהו אחר?</Text>
        <View style={styles.inputRow}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="הקלד מטלה אישית..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            onSubmitEditing={() => handleToggle(inputText)}
          />
          <TouchableOpacity
            onPress={() => handleToggle(inputText)}
            style={styles.addButton}
          >
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.sunContainer}>
          <SunVisualization stressors={stressors} size={120} showLabels={false} />
        </View>

        <View style={styles.tagsList}>
          {stressors.filter(s => s.type === 'routine').map(s => (
            <View key={s.id} style={styles.tag}>
              <Text style={styles.tagText}>{s.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onNext}
          style={styles.nextButton}
        >
          <Text style={styles.nextButtonText}>המשך לשלב הבא</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
    alignItems:"flex-start"
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
  categoryTabs: {
    flexDirection: 'row-reverse',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  categoryTab: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
  },
  categoryTabActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryTabText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#6B7280',
  },
  categoryTabTextActive: {
    color: THEME.blue,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  presetButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: 'white',
  },
  presetButtonSelected: {
    backgroundColor: `${THEME.blue}20`,
    borderColor: THEME.blue,
  },
  presetText: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#6B7280',
  },
  presetTextSelected: {
    color: THEME.blue,
    fontFamily: FONTS.bold,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'right',
  },
  inputRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    textAlign: 'right',
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: THEME.blue,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  tagsList: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tagText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#374151',
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
    backgroundColor: THEME.orange,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    marginBottom:50
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});
