import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { Colors } from '../../colors';



const stretchingExercises = [
  {
    id: 'neck-side',
    name: 'מתיחת צוואר לצדדים',
    emoji: '💆',
    duration: 30,
    instructions: 'הטו את הראש לכיוון הכתף הימנית עד שמרגישים מתיחה עדינה. החזיקו 15 שניות, ואז חזרו למרכז. חזרו על התרגיל לצד שמאל.',
    benefits: 'משחרר מתח בשרירי הצוואר והכתפיים',
    tips: 'אל תלחצו - תנו למשקל הראש לעשות את העבודה',
  },
  {
    id: 'shoulder-rolls',
    name: 'גלגול כתפיים',
    emoji: '🔄',
    duration: 30,
    instructions: 'הרימו את הכתפיים לאוזניים, גלגלו אותן לאחור בתנועה מעגלית רחבה, והורידו אותן למטה. חזרו 5 פעמים, ואז בכיוון ההפוך.',
    benefits: 'משחרר מתח מצטבר באזור הכתפיים והצוואר',
    tips: 'תנועות איטיות ומודעות - הרגישו כל שריר',
  },
  {
    id: 'chest-opener',
    name: 'פתיחת החזה',
    emoji: '🤗',
    duration: 40,
    instructions: 'שלבו את הידיים מאחורי הגב, יישרו את הזרועות ומתחו את החזה קדימה. הרימו את המבט מעט למעלה. החזיקו 30 שניות.',
    benefits: 'משפר יציבה ומשחרר מתח מישיבה ממושכת',
    tips: 'שמרו על הכתפיים למטה ורחוק מהאוזניים',
  },
  {
    id: 'spinal-twist',
    name: 'סיבוב עמוד שדרה',
    emoji: '🌀',
    duration: 40,
    instructions: 'שבו על כיסא, רגליים על הרצפה. סובבו את הגו לימין, שימו את היד השמאלית על הירך הימנית. החזיקו 20 שניות, חזרו למרכז, ושנו צד.',
    benefits: 'משפר גמישות בעמוד השדרה ומשחרר מתח בגב',
    tips: 'שמרו על האגן יציב - רק הגו מסתובב',
  },
  {
    id: 'forward-bend',
    name: 'כיפוף קדימה בישיבה',
    emoji: '🙇',
    duration: 45,
    instructions: 'שבו על קצה הכיסא, רגליים פשוקות מעט. התכופפו קדימה לאט, תנו לראש לרדת בין הברכיים, תנו לידיים לתלות למטה. החזיקו 30 שניות.',
    benefits: 'משחרר מתח מכל הגב התחתון והאמצעי',
    tips: 'נשמו עמוק - עם כל נשיפה הרגישו את הגב מתרגג',
  },
  {
    id: 'arms-overhead',
    name: 'מתיחת זרועות מעל הראש',
    emoji: '🙆',
    duration: 30,
    instructions: 'שלבו אצבעות והרימו את הידיים מעל הראש, כפות הידיים כלפי תקרה. מתחו את כל הגוף למעלה כאילו מנסים לגעת בשמיים. החזיקו 20 שניות.',
    benefits: 'מותח את כל השרירים הצדדיים של הגוף',
    tips: 'נשמו עמוק לבטן - מרגישים את הצלעות מתרחבות',
  },
  {
    id: 'side-bend',
    name: 'כיפוף לצד',
    emoji: '🤸',
    duration: 40,
    instructions: 'עמדו זקוף, רגליים ברוחב הכתפיים. הרימו יד ימנית מעל הראש והתכופפו שמאלה. החזיקו 20 שניות. חזרו למרכז ושנו צד.',
    benefits: 'משחרר מתח בצלעות ובשרירי הגב הצדדיים',
    tips: 'אל תטו קדימה או אחורה - רק לצד',
  },
  {
    id: 'hip-flexor',
    name: 'מתיחת כיפוף ירך',
    emoji: '🦵',
    duration: 45,
    instructions: 'עמדו ליד קיר לתמיכה. צעדו צעד רחב קדימה ברגל ימנית, כופפו אותה והשאירו את הרגל השמאלית ישרה מאחור. החזיקו 20 שניות ושנו רגל.',
    benefits: 'משחרר מתח מישיבה ממושכת',
    tips: 'שמרו על הגב ישר - המתיחה בחזית הירך',
  },
  {
    id: 'quad-stretch',
    name: 'מתיחת שריר ארבע ראשי',
    emoji: '🧘',
    duration: 40,
    instructions: 'עמדו על רגל אחת (אפשר להיתמך בקיר). כופפו את הרגל השנייה ואחזו את הקרסול, משכו אותו לעבר הישבן. החזיקו 20 שניות ושנו רגל.',
    benefits: 'מותח את שרירי הירך הקדמיים',
    tips: 'שמרו על הברכיים זו ליד זו',
  },
  {
    id: 'calf-stretch',
    name: 'מתיחת שוק',
    emoji: '🦶',
    duration: 40,
    instructions: 'עמדו מול קיר, רגל ימנית קדימה רגל שמאלית ישרה מאחור. לחצו על העקב האחורי לרצפה והישענו קדימה. החזיקו 20 שניות ושנו רגל.',
    benefits: 'מותח את שרירי השוק ומקל על כאבי רגליים',
    tips: 'שמרו על הכף מישורית על הרצפה',
  },
  {
    id: 'seated-twist',
    name: 'סיבוב בישיבה מלאה',
    emoji: '🪑',
    duration: 45,
    instructions: 'שבו על הרצפה, רגל ימנית ישרה. כופפו את הרגל השמאלית וחצו אותה מעל הימנית. סובבו לשמאל והחזיקו 20 שניות. שנו צד.',
    benefits: 'מתיחה עמוקה של עמוד השדרה והמותניים',
    tips: 'שאפו בעמידה ישרה, נשפו בסיבוב עמוק יותר',
  },
  {
    id: 'child-pose',
    name: 'תנוחת הילד',
    emoji: '🧎',
    duration: 60,
    instructions: 'כרעו על הברכיים, שבו על העקבים. הושיטו את הידיים קדימה על הרצפה והורידו את המצח לקרקע. נשמו עמוק וזרמו לתוך התנוחה.',
    benefits: 'מתיחה מרגיעה של כל הגב והכתפיים',
    tips: 'זו תנוחת מנוחה - תנו לגוף להירגע לחלוטין',
  },
  {
    id: 'final-breath',
    name: 'נשימות סיום',
    emoji: '🌬️',
    duration: 45,
    instructions: 'שבו בנוחות או שכבו. סגרו את העיניים. קחו 5 נשימות עמוקות - שאפו לאט דרך האף, נשפו לאט דרך הפה. הרגישו את הרוגע.',
    benefits: 'מחזיר את הגוף למצב של שלווה ורגיעה',
    tips: 'הרגישו את כל השרירים שעבדתם - הם רגועים ורכים',
  },
];

export default function StretchingExercise() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(stretchingExercises[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [showDetails, setShowDetails] = useState(false);

  const currentExercise = stretchingExercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / stretchingExercises.length) * 100;

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentExerciseIndex < stretchingExercises.length - 1) {
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

              setCurrentExerciseIndex((prev) => prev + 1);
              setShowDetails(false);
              return stretchingExercises[currentExerciseIndex + 1].duration;
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
  }, [isRunning, timeLeft, currentExerciseIndex]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentExerciseIndex(0);
    setTimeLeft(stretchingExercises[0].duration);
    setIsCompleted(false);
    setShowDetails(false);
    fadeAnim.setValue(1);
  };

  const handleSkip = () => {
    if (currentExerciseIndex < stretchingExercises.length - 1) {
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

      setCurrentExerciseIndex((prev) => prev + 1);
      setTimeLeft(stretchingExercises[currentExerciseIndex + 1].duration);
      setShowDetails(false);
    }
  };

  if (isCompleted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => {}}
          >
            <Text style={styles.backButtonText}>חזרה</Text>
          </TouchableOpacity> */}
          <Text style={styles.headerTitle}>הרפיית שרירים</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>מצוין!</Text>
          <Text style={styles.completedText}>
            סיימתם את תרגילי המתיחות בהצלחה
          </Text>
          <Text style={styles.completedSubtext}>
            הגוף שלכם יודה לכם על זה
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>💪</Text>
              <Text style={styles.statValue}>{stretchingExercises.length}</Text>
              <Text style={styles.statLabel}>תרגילים</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>⏱️</Text>
              <Text style={styles.statValue}>
                {Math.floor(stretchingExercises.reduce((sum, ex) => sum + ex.duration, 0) / 60)}
              </Text>
              <Text style={styles.statLabel}>דקות</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>✨</Text>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>הושלם</Text>
            </View>
          </View>

          <View style={styles.completedButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleReset}
            >
              <Text style={styles.primaryButtonText}>עוד פעם</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() =>{}}
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
        {/* <TouchableOpacity
          style={styles.backButton}
          onPress={() => {}}
        >
          <Text style={styles.backButtonText}>חזרה</Text>
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>הרפיית שרירים</Text>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setShowDetails(!showDetails)}
        >
          <Text style={styles.infoButtonText}>{showDetails ? '✕' : 'ℹ️'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.exerciseCounter}>
          תרגיל {currentExerciseIndex + 1} מתוך {stretchingExercises.length}
        </Text>

        <Animated.View style={[styles.exerciseCard, { opacity: fadeAnim }]}>
          <Text style={styles.exerciseEmoji}>{currentExercise.emoji}</Text>
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          <Text style={styles.exerciseInstructions}>
            {currentExercise.instructions}
          </Text>

          {showDetails && (
            <View style={styles.detailsContainer}>
              <View style={styles.detailBox}>
                <Text style={styles.detailTitle}>💚 יתרון</Text>
                <Text style={styles.detailText}>{currentExercise.benefits}</Text>
              </View>
              <View style={styles.detailBox}>
                <Text style={styles.detailTitle}>💡 טיפ</Text>
                <Text style={styles.detailText}>{currentExercise.tips}</Text>
              </View>
            </View>
          )}
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
                {currentExerciseIndex === 0 && timeLeft === stretchingExercises[0].duration
                  ? 'התחל תרגיל'
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
            {currentExerciseIndex < stretchingExercises.length - 1 && (
              <TouchableOpacity
                style={styles.controlButton}
                onPress={handleSkip}
              >
                <Text style={styles.controlButtonText}>דלג</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {currentExerciseIndex < stretchingExercises.length - 1 && (
          <View style={styles.upcomingContainer}>
            <Text style={styles.upcomingTitle}>הבא בתור:</Text>
            <Text style={styles.upcomingText}>
              {stretchingExercises[currentExerciseIndex + 1].emoji}{' '}
              {stretchingExercises[currentExerciseIndex + 1].name}
            </Text>
          </View>
        )}
      </ScrollView>
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
  infoButton: {
    padding: 8,
    width: 60,
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 20,
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  exerciseCounter: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.secondary,
    marginBottom: 24,
    textAlign: 'right',
  },
  exerciseCard: {
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
    marginBottom: 24,
  },
  exerciseEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
    color: Colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  exerciseInstructions: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  detailsContainer: {
    width: '100%',
    marginTop: 20,
    gap: 12,
  },
  detailBox: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 16,
    borderRightWidth: 3,
    borderRightColor: Colors.primary,
  },
  detailTitle: {
    fontSize: 14,
    fontFamily: 'Rubik-Bold',
    color: Colors.text.primary,
    marginBottom: 6,
    textAlign: 'right',
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
    textAlign: 'right',
    lineHeight: 22,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 20,
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
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    width: '100%',
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
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
