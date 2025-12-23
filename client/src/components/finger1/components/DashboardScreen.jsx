import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { Eye, EyeOff } from 'lucide-react-native';
import { StressLevel, THEME, FONTS } from '../types';
import { SunVisualization } from './SunVisualization';

const { width, height } = Dimensions.get('window');

const Bubble = ({ text, index, total }) => {
  const angleSpread = (2 * Math.PI) / Math.max(total, 1);
  const baseAngle = index * angleSpread + (Math.random() - 0.5) * 0.5;

  const distance = 250 + Math.random() * 150;
  const finalX = Math.cos(baseAngle) * distance;
  const finalY = -Math.abs(Math.sin(baseAngle) * distance) - 200 - Math.random() * 200;

  const startX = (Math.random() - 0.5) * 100;
  const startY = (Math.random() - 0.5) * 50;

  const delay = index * 800 + Math.random() * 400;
  const duration = 14000 + Math.random() * 6000;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(startY);
  const translateX = useSharedValue(startX);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(0.9, { duration: 1500 }),
        withTiming(0.9, { duration: duration - 4500 }),
        withTiming(0, { duration: 3000 })
      )
    );
    translateY.value = withDelay(delay, withTiming(finalY, { duration }));
    translateX.value = withDelay(delay, withTiming(finalX, { duration }));
    scale.value = withDelay(delay, withTiming(1, { duration: 1500 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[styles.bubble, animatedStyle]}>
      <Text style={styles.bubbleText}>{text}</Text>
    </Animated.View>
  );
};

export const DashboardScreen = ({ stressors, traits }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const sunSize = Math.min(width * 0.7, height * 0.35);

  const sunStressors = showOriginal
    ? stressors.map(s => s.level === StressLevel.RELEASED ? { ...s, level: StressLevel.NORMAL } : s)
    : stressors.filter(s => s.level !== StressLevel.RELEASED);

  const releasedStressors = showOriginal
    ? []
    : stressors.filter(s => s.level === StressLevel.RELEASED);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>תמונת המצב שלך</Text>
        <Text style={styles.subtitle}>השמש של הלחצים והכוחות</Text>

        <TouchableOpacity
          onPress={() => setShowOriginal(!showOriginal)}
          style={styles.toggleButton}
        >
          {showOriginal ? (
            <>
              <Text style={styles.toggleText}>חזרה למצב הנוכחי</Text>
              <EyeOff size={16} color={THEME.orange} />
            </>
          ) : (
            <>
              <Text style={styles.toggleText}>השווה לפני הסינון</Text>
              <Eye size={16} color={THEME.orange} />
            </>
          )}
        </TouchableOpacity>

        <Text style={[styles.warningText, !showOriginal && styles.warningTextHidden]}>
          כך זה נראה כשהכל עליך. שים לב להבדל!
        </Text>
      </View>

      <View style={styles.visualizationContainer}>
        <SunVisualization
          stressors={sunStressors}
          size={sunSize}
          animate={true}
          showLabels={true}
        />

        {releasedStressors.map((s, i) => (
          <Bubble key={s.id} text={s.text} index={i} total={releasedStressors.length} />
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>המשך לאצבע המאזניים</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>חכמת שדרות</Text>
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
  header: {
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: FONTS.bold,
    color: THEME.blue,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  toggleButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  toggleText: {
    fontSize: 13,
    fontFamily: FONTS.bold,
    color: THEME.orange,
  },
  warningText: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: THEME.orange,
    marginTop: 6,
    textAlign: 'center',
    height: 20,
  },
  warningTextHidden: {
    opacity: 0,
  },
  visualizationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: THEME.blue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bubbleText: {
    color: 'white',
    fontSize: 13,
    fontFamily: FONTS.medium,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: THEME.blue,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: THEME.blue,
    marginBottom:50
  },
  secondaryButtonText: {
    color: THEME.blue,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
});
