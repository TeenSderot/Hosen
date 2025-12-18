import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { THEME, FONTS } from '../types';

const CustomSlider = ({ labelLeft, labelRight, value, onChange }) => {
  const trackWidth = useSharedValue(0);
  const thumbPosition = useSharedValue(value);

  const onLayout = (event) => {
    trackWidth.value = event.nativeEvent.layout.width;
  };

  const updateValue = (newValue) => {
    onChange(Math.round(newValue));
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (trackWidth.value > 0) {
        const ltrPercentage = Math.min(Math.max(e.x / trackWidth.value, 0), 1);
        const rtlValue = (1 - ltrPercentage) * 100;
        thumbPosition.value = rtlValue;
        runOnJS(updateValue)(rtlValue);
      }
    });

  const tapGesture = Gesture.Tap()
    .onEnd((e) => {
      if (trackWidth.value > 0) {
        const ltrPercentage = Math.min(Math.max(e.x / trackWidth.value, 0), 1);
        const rtlValue = (1 - ltrPercentage) * 100;
        thumbPosition.value = rtlValue;
        runOnJS(updateValue)(rtlValue);
      }
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${thumbPosition.value}%`,
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    right: `${thumbPosition.value}%`,
    transform: [{ translateX: 14 }],
  }));

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>{labelRight}</Text>
        <Text style={styles.sliderLabel}>{labelLeft}</Text>
      </View>

      <GestureDetector gesture={composedGesture}>
        <View style={styles.sliderTrackContainer} onLayout={onLayout}>
          <View style={styles.sliderTrack}>
            <Animated.View style={[styles.sliderFill, fillStyle]} />
          </View>

          <Animated.View style={[styles.sliderThumb, thumbStyle]}>
            <View style={styles.sliderThumbInner} />
          </Animated.View>
        </View>
      </GestureDetector>
    </View>
  );
};

export const InnerMirrorScreen = ({ traits, setTraits, onNext }) => {
  const getInsight = () => {
    if (traits.control > 70) return "הצורך בשליטה עשוי להעצים כרגע את הלחץ באזורי אי-הוודאות.";
    if (traits.perfectionism > 70) return "הפרפקציוניזם מקשה על שחרור מטלות הבית, נסה להיות יותר סלחן לעצמך.";
    if (traits.sharing > 70) return "שמירה בבטן מכבידה על הלב. זה הזמן להיעזר באחרים.";
    return "זיהוי הדפוסים שלך הוא הצעד הראשון להקלה.";
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>המראה הפנימית</Text>
        <Text style={styles.subtitle}>
          לפעמים האופי שלנו מקל, ולפעמים הוא מכביד. איפה אתם נמצאים על הסקאלה?
        </Text>

        <View style={styles.slidersCard}>
          <CustomSlider
            labelRight="זורם עם המצב"
            labelLeft="חייב שליטה"
            value={traits.control}
            onChange={(v) => setTraits({ ...traits, control: v })}
          />
          <CustomSlider
            labelRight="משחרר"
            labelLeft="פרפקציוניסט"
            value={traits.perfectionism}
            onChange={(v) => setTraits({ ...traits, perfectionism: v })}
          />
          <CustomSlider
            labelRight="מבקש עזרה"
            labelLeft="שומר בבטן"
            value={traits.sharing}
            onChange={(v) => setTraits({ ...traits, sharing: v })}
          />
        </View>

        <View style={styles.insightBox}>
          <Text style={styles.insightText}>{getInsight()}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={onNext}
          style={styles.nextButton}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>בואו נראה את התמונה המלאה</Text>
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
    marginBottom: 32,
    textAlign: 'right',
  },
  slidersCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  sliderContainer: {
    marginBottom: 32,
  },
  sliderLabels: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    color: '#6B7280',
  },
  sliderTrackContainer: {
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  sliderFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: THEME.orange,
    borderRadius: 6,
  },
  sliderThumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: THEME.orange,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderThumbInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.orange,
  },
  insightBox: {
    backgroundColor: `${THEME.yellow}50`,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${THEME.blue}30`,
  },
  insightText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: '#374151',
    textAlign: 'center',
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
