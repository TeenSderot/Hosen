import { useState } from 'react';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import Screen4 from './Screen4';
import Screen5 from './Screen5';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Finger3App() {
  const screenOrder = [1, 5, 4, 3, 2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation()
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, screenOrder.length - 1));
  };

  const handleBack = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const currentScreen = screenOrder[currentIndex];

  return (
    <View>
      {currentScreen === 1 && <Screen1 onNext={handleNext} />}
      {currentScreen === 2 && <Screen2 onNext={()=>navigation.navigate('toolbox')} onBack={handleBack} />}
      {currentScreen === 3 && <Screen3 onNext={handleNext} onBack={handleBack} />}
      {currentScreen === 4 && <Screen4 onNext={handleNext} onBack={handleBack} />}
      {currentScreen === 5 && <Screen5 onNext={handleNext} onBack={handleBack} />}
    </View>
  );
}

export default Finger3App;
