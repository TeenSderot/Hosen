import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, Circle, AlertCircle } from 'lucide-react-native';
import { StressLevel, THEME, FONTS } from '../types';

export const LoadFilterScreen = ({ stressors, onUpdateLevel, onNext }) => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    const allNormal = stressors.length > 0 && stressors.every(s => s.level === StressLevel.NORMAL);

    if (allNormal && !hasInitialized.current) {
      stressors.forEach(s => {
        onUpdateLevel(s.id, StressLevel.RELEASED);
      });
      hasInitialized.current = true;
    }
  }, [stressors, onUpdateLevel]);

  const toggleStressor = (id, currentLevel) => {
    const newLevel = currentLevel === StressLevel.RELEASED ? StressLevel.NORMAL : StressLevel.RELEASED;
    onUpdateLevel(id, newLevel);
  };

  const heavyCount = stressors.filter(s => s.level === StressLevel.NORMAL).length;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>בואו נמקד:</Text>
        <Text style={styles.subtitle}>
          סמנו את המשימות שהכי{' '}
          <Text style={styles.highlight}>מכבידות עליכם</Text>
          {' '}כרגע.
        </Text>
        <Text style={styles.hint}>כל השאר יסומן כ"משוחרר" כברירת מחדל.</Text>

        <View style={styles.list}>
          {stressors.map((s) => {
            const isHeavy = s.level === StressLevel.NORMAL;

            return (
              <TouchableOpacity
                key={s.id}
                onPress={() => toggleStressor(s.id, s.level)}
                style={[
                  styles.listItem,
                  isHeavy ? styles.listItemHeavy : styles.listItemReleased
                ]}
                activeOpacity={0.7}
              >
                <View style={styles.itemContent}>
                  <Text style={[
                    styles.itemText,
                    isHeavy ? styles.itemTextHeavy : styles.itemTextReleased
                  ]}>
                    {s.text}
                  </Text>
                  <Text style={[
                    styles.itemStatus,
                    isHeavy ? styles.itemStatusHeavy : styles.itemStatusReleased
                  ]}>
                    {isHeavy ? 'מכביד עלי' : 'משוחרר / זורם'}
                  </Text>
                </View>

                <View style={[
                  styles.itemIcon,
                  isHeavy ? styles.itemIconHeavy : styles.itemIconReleased
                ]}>
                  {isHeavy ? (
                    <AlertCircle size={24} color="white" />
                  ) : (
                    <Circle size={24} color="#D1D5DB" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.nextButtonText}>
            {heavyCount > 0 ? `המשך עם ${heavyCount||0} משימות מכבידות` : 'המשך (הכל משוחרר)'}
          </Text>
        <TouchableOpacity
          onPress={onNext}
          style={styles.nextButton}
          activeOpacity={0.8}
        >
          
          <Check size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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
    alignItems:'flex-start'
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.bold,
    color: THEME.blue,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: '#6B7280',
  },
  highlight: {
    fontFamily: FONTS.bold,
    color: THEME.orange,
  },
  hint: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 24,
    textAlign: 'right',
  },
  list: {
    gap: 12,
  },
  listItem: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemHeavy: {
    backgroundColor: '#FFF7ED',
    borderColor: THEME.orange,
    shadowColor: THEME.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItemReleased: {
    backgroundColor: 'white',
    borderColor: `${THEME.blue}30`,
  },
  itemContent: {
    flex: 1,
    alignItems: 'flex-end',
  },
  itemText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
  itemTextHeavy: {
    color: '#1F2937',
  },
  itemTextReleased: {
    color: '#6B7280',
  },
  itemStatus: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    marginTop: 4,
  },
  itemStatusHeavy: {
    color: THEME.orange,
  },
  itemStatusReleased: {
    color: THEME.blue,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIconHeavy: {
    backgroundColor: THEME.orange,
    shadowColor: THEME.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  itemIconReleased: {
    backgroundColor: '#F3F4F6',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  nextButton: {
    backgroundColor: THEME.orange,
    paddingVertical: 16,
    borderRadius: 999,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom:50
  },
  nextButtonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: FONTS.bold,
    
  },
});
