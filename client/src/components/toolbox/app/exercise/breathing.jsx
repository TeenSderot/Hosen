import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { Colors } from '../../colors';


const techniques= [
  { id: '4-4-6', name: '6-4-4 (בריאת מחדל)', inhale: 6, hold: 4, exhale: 4 },
  { id: '4-7-8', name: '8-7-4 (הרגעה עמוקה)', inhale: 4, hold: 7, exhale: 8 },
  { id: 'box', name: 'קופסא 4-4-4-4', inhale: 4, hold: 4, exhale: 4, holdAfterExhale: 4 },
];

export default function BreathingExercise() {

const [selectedTechnique, setSelectedTechnique] = useState(techniques[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [countdown, setCountdown] = useState(selectedTechnique.inhale);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const scale = useSharedValue(0.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  console.log("breathing screen");
  
  const startBreathing = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setCountdown(selectedTechnique.inhale);
    setCycleCount(0);
    setTotalTime(0);
  };

  const stopBreathing = () => {
    setIsActive(false);
    cancelAnimation(scale);
    scale.value = withTiming(0.5, { duration: 300 });
  };

  useEffect(() => {
    if (!isActive) return;

    const cycleTime =
      selectedTechnique.inhale +
      selectedTechnique.hold +
      selectedTechnique.exhale +
      (selectedTechnique.holdAfterExhale || 0);

    if (currentPhase === 'inhale') {
      scale.value = withTiming(1, {
        duration: selectedTechnique.inhale * 1000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    } else if (currentPhase === 'exhale') {
      scale.value = withTiming(0.5, {
        duration: selectedTechnique.exhale * 1000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (vibrateEnabled) {
            Vibration.vibrate(100);
          }

          if (currentPhase === 'inhale') {
            setCurrentPhase('hold');
            return selectedTechnique.hold;
          } else if (currentPhase === 'hold') {
            setCurrentPhase('exhale');
            return selectedTechnique.exhale;
          } else if (currentPhase === 'exhale') {
            if (selectedTechnique.holdAfterExhale) {
              setCurrentPhase('holdAfter');
              return selectedTechnique.holdAfterExhale;
            } else {
              setCurrentPhase('inhale');
              setCycleCount((c) => c + 1);
              return selectedTechnique.inhale;
            }
          } else if (currentPhase === 'holdAfter') {
            setCurrentPhase('inhale');
            setCycleCount((c) => c + 1);
            return selectedTechnique.inhale;
          }
        }
        return prev - 1;
      });

      setTotalTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, currentPhase, selectedTechnique, vibrateEnabled]);

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'שאיפה';
      case 'hold':
        return 'החזקה';
      case 'exhale':
        return 'נשיפה';
      case 'holdAfter':
        return 'החזקה';
      default:
        return '';
    }
  };

  const getInstructionText = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'נשמו פנימה בעדינות';
      case 'hold':
        return 'החזיקו את הנשימה';
      case 'exhale':
        return 'נשפו החוצה לאט';
      case 'holdAfter':
        return 'החזיקו את הנשימה';
      default:
        return '';
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.headerTitle}>מנוע נשימות</Text>
        {/* <TouchableOpacity style={styles.closeButton} onPress={()=>{}}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.content}>
        <View style={styles.techniqueCard}>
          <Text style={styles.techniqueTitle}>תבנית נשימה</Text>
          <View style={styles.techniqueButtons}>
            {techniques.map((technique) => (
              <TouchableOpacity
                key={technique.id}
                style={[
                  styles.techniqueButton,
                  selectedTechnique.id === technique.id && styles.techniqueButtonActive,
                ]}
                onPress={() => {
                  if (!isActive) {
                    setSelectedTechnique(technique);
                    setCountdown(technique.inhale);
                  }
                }}
                disabled={isActive}
              >
                <Text
                  style={[
                    styles.techniqueButtonText,
                    selectedTechnique.id === technique.id && styles.techniqueButtonTextActive,
                  ]}
                >
                  {technique.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setVibrateEnabled(!vibrateEnabled)}
            >
              <Text style={styles.optionIcon}>📳</Text>
              <Text style={styles.optionText}>רטט</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setSoundEnabled(!soundEnabled)}
            >
              <Text style={styles.optionIcon}>{soundEnabled ? '🔊' : '🔇'}</Text>
              <Text style={styles.optionText}>צליל</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.circleContainer}>
          <Animated.View style={[styles.circle, animatedStyle]}>
            <View style={styles.circleInner}>
              <Text style={styles.countdownText}>{countdown}</Text>
              <Text style={styles.phaseText}>{getPhaseText()}</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>{getInstructionText()}</Text>
        </View>

        <View style={styles.controls}>
          {!isActive ? (
            <TouchableOpacity style={styles.startButton} onPress={startBreathing}>
              
              <Text style={styles.startButtonText}>התחלה</Text>
              <Text style={styles.startButtonIcon}>◀</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.pauseButton} onPress={stopBreathing}>
              
              <Text style={styles.pauseButtonText}>השהה</Text>
              <Text style={styles.pauseButtonIcon}>⏸</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            מחזור {cycleCount} • {formatTime(totalTime)}
          </Text>
        </View>
      </View>
    </ScrollView>
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
    justifyContent: 'center',
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsButton: {
    
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  settingsIcon: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Rubik-Bold',
    color: Colors.text.primary,
   
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  closeIcon: {
    fontSize: 24,
    color: Colors.gray,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  techniqueCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  techniqueTitle: {
    fontSize: 16,
    fontFamily: 'Rubik-SemiBold',
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  techniqueButtons: {
    gap: 8,
    marginBottom: 16,
  },
  techniqueButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  techniqueButtonActive: {
    backgroundColor: "#84C7DA",
    borderColor: "#84C7DA",
  },
  techniqueButtonText: {
    fontSize: 15,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  techniqueButtonTextActive: {
    fontFamily: 'Rubik-SemiBold',
    color: Colors.white,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
  },
  optionIcon: {
    fontSize: 18,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Rubik-SemiBold',
    color: Colors.white,
    textAlign: 'right',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownText: {
    fontSize: 72,
    fontFamily: 'Rubik-Bold',
    color: "#84C7DA",
    marginBottom: 8,
    textAlign: 'right',
  },
  phaseText: {
    fontSize: 20,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.light,
    textAlign: 'right',
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  instructionText: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  controls: {
    alignItems: 'center',
    marginBottom: 24,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 24,
    gap: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonIcon: {
    fontSize: 20,
    color: Colors.white,
  },
  startButtonText: {
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
    color: Colors.white,
    textAlign: 'right',
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 24,
    gap: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  pauseButtonIcon: {
    fontSize: 20,
    color: Colors.white,
  },
  pauseButtonText: {
    fontSize: 18,
    fontFamily: 'Rubik-Bold',
    color: Colors.white,
    textAlign: 'right',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: Colors.text.light,
    textAlign: 'right',
  },
});
