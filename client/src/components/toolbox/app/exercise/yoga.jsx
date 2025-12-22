import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Colors } from '../../colors';



const yogaPoses = [
  {
    id: 'shake',
    name: 'ניעור הגוף',
    emoji: '🤸',
    duration: 30,
    instructions: 'עמדו זקוף ונערו את כל הגוף בעדינות. שחררו את הידיים, הרגליים והראש.',
  },
  {
    id: 'mountain',
    name: 'תנוחת ההר',
    emoji: '🧘',
    duration: 20,
    instructions: 'עמדו זקוף, רגליים ברוחב הכתפיים, ידיים לצדדים. נשימה עמוקה.',
  },
  {
    id: 'arms-up',
    name: 'מתיחת ידיים למעלה',
    emoji: '🙆',
    duration: 20,
    instructions: 'הרימו את הידיים למעלה מעל הראש. מתחו את כל הגוף כלפי מעלה.',
  },
  {
    id: 'forward-bend',
    name: 'כיפוף קדימה',
    emoji: '🙇',
    duration: 30,
    instructions: 'התכופפו קדימה בעדינות. תנו לידיים לרדת לכיוון הרצפה.',
  },
  {
    id: 'shoulder-rolls',
    name: 'סיבוב כתפיים',
    emoji: '💆',
    duration: 20,
    instructions: 'סובבו את הכתפיים קדימה 5 פעמים, ואז אחורה 5 פעמים.',
  },
  {
    id: 'neck-stretch',
    name: 'מתיחת צוואר',
    emoji: '🤷',
    duration: 30,
    instructions: 'הטו את הראש ימינה, שמאלה, קדימה ואחורה. בעדינות ובאיטיות.',
  },
  {
    id: 'warrior',
    name: 'תנוחת הלוחם',
    emoji: '🤺',
    duration: 20,
    instructions: 'צעד רחב קדימה, ידיים לצדדים. חזקים ויציבים.',
  },
  {
    id: 'tree',
    name: 'תנוחת העץ',
    emoji: '🌳',
    duration: 20,
    instructions: 'עמדו על רגל אחת, הרגל השנייה על הירך. ידיים מחוברות מול החזה.',
  },
  {
    id: 'child',
    name: 'תנוחת הילד',
    emoji: '🧎',
    duration: 30,
    instructions: 'כרעו על הברכיים, שבו על העקבים, הושיטו ידיים קדימה על הרצפה.',
  },
  {
    id: 'breath',
    name: 'נשימה עמוקה',
    emoji: '🌬️',
    duration: 30,
    instructions: 'שבו בנוחות. 5 נשימות עמוקות - שאיפה לאט, נשיפה לאט.',
  },
];

export default function YogaExercise() {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(yogaPoses[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const currentPose = yogaPoses[currentPoseIndex];
  const progress = ((currentPoseIndex + 1) / yogaPoses.length) * 100;

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentPoseIndex < yogaPoses.length - 1) {
              Animated.sequence([
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: true,
                }),
              ]).start();

              setCurrentPoseIndex((prev) => prev + 1);
              return yogaPoses[currentPoseIndex + 1].duration;
            } else {
              setIsRunning(false);
              setIsCompleted(true);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentPoseIndex]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentPoseIndex(0);
    setTimeLeft(yogaPoses[0].duration);
    setIsCompleted(false);
    fadeAnim.setValue(1);
  };

  const handleSkip = () => {
    if (currentPoseIndex < yogaPoses.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentPoseIndex((prev) => prev + 1);
      setTimeLeft(yogaPoses[currentPoseIndex + 1].duration);
    }
  };

  if (isCompleted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {}}
          >
            <Text style={styles.backButtonText}>חזרה</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>תרגיל יוגה</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>כל הכבוד!</Text>
          <Text style={styles.completedText}>
            סיימתם את התרגיל בהצלחה
          </Text>
          <Text style={styles.completedSubtext}>
            איך אתם מרגישים עכשיו?
          </Text>

          <View style={styles.completedButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleReset}
            >
              <Text style={styles.primaryButtonText}>עוד פעם</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {}}
            >
              <Text style={styles.secondaryButtonText}>סיום</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>{}}
        >
          <Text style={styles.backButtonText}>חזרה</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>תרגיל יוגה</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.poseCounter}>
          {currentPoseIndex + 1} מתוך {yogaPoses.length}
        </Text>

        <Animated.View style={[styles.poseCard, { opacity: fadeAnim }]}>
          <Text style={styles.poseEmoji}>{currentPose.emoji}</Text>
          <Text style={styles.poseName}>{currentPose.name}</Text>
          <Text style={styles.poseInstructions}>
            {currentPose.instructions}
          </Text>
        </Animated.View>

        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>זמן נותר</Text>
          <Text style={styles.timerText}>{timeLeft}</Text>
          <Text style={styles.timerUnit}>שניות</Text>
        </View>

        <View style={styles.controls}>
          {!isRunning ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStart}
            >
              <Text style={styles.startButtonText}>
                {currentPoseIndex === 0 && timeLeft === yogaPoses[0].duration
                  ? 'התחל'
                  : 'המשך'}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={handlePause}
            >
              <Text style={styles.pauseButtonText}>השהה</Text>
            </TouchableOpacity>
          )}

          <View style={styles.secondaryControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleReset}
            >
              <Text style={styles.controlButtonText}>התחל מחדש</Text>
            </TouchableOpacity>
            {currentPoseIndex < yogaPoses.length - 1 && (
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleSkip}
              >
                <Text style={styles.controlButtonText}>דלג</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.upcomingContainer}>
          <Text style={styles.upcomingTitle}>הבא:</Text>
          {currentPoseIndex < yogaPoses.length - 1 && (
            <Text style={styles.upcomingText}>
              {yogaPoses[currentPoseIndex + 1].emoji}{' '}
              {yogaPoses[currentPoseIndex + 1].name}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 48,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Rubik-Bold',
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 60,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.lightGray,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  poseCounter: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.secondary,
    marginBottom: 24,
    textAlign: 'right',
  },
  poseCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  poseEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  poseName: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  poseInstructions: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  timerLabel: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.secondary,
    marginBottom: 8,
    textAlign: 'right',
  },
  timerText: {
    fontSize: 64,
    fontFamily: 'Rubik-Bold',
    color: Colors.primary,
    textAlign: 'right',
  },
  timerUnit: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
    textAlign: 'right',
  },
  controls: {
    width: '100%',
    gap: 12,
  },
  startButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
    color: Colors.white,
    textAlign: 'right',
  },
  pauseButton: {
    backgroundColor: Colors.accent,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  pauseButtonText: {
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
    color: Colors.white,
    textAlign: 'right',
  },
  secondaryControls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.primary,
    textAlign: 'right',
  },
  upcomingContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width: '100%',
  },
  upcomingTitle: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.secondary,
    marginBottom: 4,
    textAlign: 'right',
  },
  upcomingText: {
    fontSize: 16,
    fontFamily: 'Rubik-SemiBold',
    color: Colors.text.primary,
    textAlign: 'right',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  completedEmoji: {
    fontSize: 100,
    marginBottom: 24,
  },
  completedTitle: {
    fontSize: 32,
    fontFamily: 'Rubik-Bold',
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'right',
  },
  completedText: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  completedSubtext: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.light,
    marginBottom: 32,
    textAlign: 'center',
  },
  completedButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Rubik-Bold',
    color: Colors.white,
    textAlign: 'right',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.primary,
    textAlign: 'right',
  },
});
