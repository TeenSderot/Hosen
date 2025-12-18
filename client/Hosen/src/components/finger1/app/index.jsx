import React, { useState } from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenStep, StressLevel } from '../types';
import { SplashScreen } from '../components/SplashScreen';
import { RoutinePackScreen } from '../components/RoutinePackScreen';
import { Oct7WeightsScreen } from '../components/Oct7WeightsScreen';
import { LoadFilterScreen } from '../components/LoadFilterScreen';
import { InnerMirrorScreen } from '../components/InnerMirrorScreen';
import { DashboardScreen } from '../components/DashboardScreen';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  const [currentStep, setCurrentStep] = useState(ScreenStep.SPLASH);
  const [stressors, setStressors] = useState([]);
  const [traits, setTraits] = useState({
    control: 50,
    perfectionism: 50,
    sharing: 50,
  });

  const addStressor = (newStressor) => {
    setStressors((prev) => [...prev, newStressor]);
  };

  const updateStressorLevel = (id, level) => {
    setStressors((prev) =>
      prev.map(s => s.id === id ? { ...s, level } : s)
    );
  };

  const removeStressor = (id) => {
    setStressors((prev) => prev.filter(s => s.id !== id));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const renderScreen = () => {
    switch (currentStep) {
      case ScreenStep.SPLASH:
        return <SplashScreen onNext={nextStep} />;
      case ScreenStep.ROUTINE_PACK:
        return (
          <RoutinePackScreen
            stressors={stressors}
            onAdd={addStressor}
            onRemove={removeStressor}
            onNext={nextStep}
          />
        );
      case ScreenStep.OCT7_WEIGHTS:
        return (
          <Oct7WeightsScreen
            stressors={stressors}
            onAdd={addStressor}
            onRemove={removeStressor}
            onNext={nextStep}
          />
        );
      case ScreenStep.LOAD_FILTER:
        return (
          <LoadFilterScreen
            stressors={stressors}
            onUpdateLevel={updateStressorLevel}
            onNext={nextStep}
          />
        );
      case ScreenStep.INNER_MIRROR:
        return (
          <InnerMirrorScreen
            traits={traits}
            setTraits={setTraits}
            onNext={nextStep}
          />
        );
      case ScreenStep.DASHBOARD:
        return (
          <DashboardScreen
            stressors={stressors}
            traits={traits}
          />
        );
      default:
        return <SplashScreen onNext={nextStep} />;
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.content}>
          {renderScreen()}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
});
