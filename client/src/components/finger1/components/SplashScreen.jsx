import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Stop, Circle, Path, G } from 'react-native-svg';
import { ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME, FONTS } from '../types';

const { width, height } = Dimensions.get('window');
const sunSize = Math.min(width * 0.85, 350);

const SplashSun = () => {
  const cx = sunSize / 2;
  const cy = sunSize / 2;
  const centerRadius = sunSize * 0.18;
  const numRays = 12;

  const pulseScale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.08, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    rotation.value = withRepeat(
      withTiming(360, { duration: 60000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const raysStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const generateRayPath = (angle, length, baseWidth) => {
    const angleRad = (angle - 90) * (Math.PI / 180);
    const startX = cx + Math.cos(angleRad) * (centerRadius + 5);
    const startY = cy + Math.sin(angleRad) * (centerRadius + 5);
    const endX = cx + Math.cos(angleRad) * (centerRadius + length);
    const endY = cy + Math.sin(angleRad) * (centerRadius + length);

    const perpAngle = angleRad + Math.PI / 2;
    const halfBase = baseWidth / 2;
    const tipWidth = 2;

    return `M ${startX + Math.cos(perpAngle) * halfBase} ${startY + Math.sin(perpAngle) * halfBase}
            Q ${(startX + endX) / 2 + Math.cos(perpAngle) * halfBase * 0.6} ${(startY + endY) / 2 + Math.sin(perpAngle) * halfBase * 0.6} ${endX + Math.cos(perpAngle) * tipWidth} ${endY + Math.sin(perpAngle) * tipWidth}
            L ${endX - Math.cos(perpAngle) * tipWidth} ${endY - Math.sin(perpAngle) * tipWidth}
            Q ${(startX + endX) / 2 - Math.cos(perpAngle) * halfBase * 0.6} ${(startY + endY) / 2 - Math.sin(perpAngle) * halfBase * 0.6} ${startX - Math.cos(perpAngle) * halfBase} ${startY - Math.sin(perpAngle) * halfBase}
            Z`;
  };

  const rays = [];
  for (let i = 0; i < numRays; i++) {
    const angle = (i / numRays) * 360;
    const isLong = i % 2 === 0;
    const length = isLong ? sunSize * 0.28 : sunSize * 0.18;
    const baseWidth = isLong ? sunSize * 0.055 : sunSize * 0.04;
    rays.push({ angle, length, baseWidth, isLong });
  }

  return (
    <Animated.View style={containerStyle}>
      <Svg width={sunSize} height={sunSize} viewBox={`0 0 ${sunSize} ${sunSize}`}>
        <Defs>
          <RadialGradient id="splashSunGradient" cx="35%" cy="35%" r="65%">
            <Stop offset="0%" stopColor="#FEF9C3" />
            <Stop offset="30%" stopColor="#FDE047" />
            <Stop offset="70%" stopColor="#FBBF24" />
            <Stop offset="100%" stopColor="#F97316" />
          </RadialGradient>
          <RadialGradient id="splashGlowGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#FDE047" stopOpacity="0.5" />
            <Stop offset="50%" stopColor="#FBBF24" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="splashRayGradient" cx="50%" cy="0%" r="120%">
            <Stop offset="0%" stopColor="#FDE047" />
            <Stop offset="50%" stopColor="#FBBF24" />
            <Stop offset="100%" stopColor="#F97316" />
          </RadialGradient>
        </Defs>

        <Circle cx={cx} cy={cy} r={sunSize * 0.45} fill="url(#splashGlowGradient)" />

        <Animated.View style={raysStyle}>
          <G>
            {rays.map((ray, i) => (
              <Path
                key={i}
                d={generateRayPath(ray.angle, ray.length, ray.baseWidth)}
                fill="url(#splashRayGradient)"
                opacity={ray.isLong ? 1 : 0.8}
              />
            ))}
          </G>
        </Animated.View>

        <Circle
          cx={cx}
          cy={cy}
          r={centerRadius}
          fill="url(#splashSunGradient)"
          stroke="white"
          strokeWidth={4}
        />

        <Circle
          cx={cx - centerRadius * 0.3}
          cy={cy - centerRadius * 0.3}
          r={centerRadius * 0.2}
          fill="rgba(255,255,255,0.5)"
        />
        <Circle
          cx={cx - centerRadius * 0.15}
          cy={cy - centerRadius * 0.45}
          r={centerRadius * 0.08}
          fill="rgba(255,255,255,0.3)"
        />
      </Svg>
    </Animated.View>
  );
};

export const SplashScreen = ({ onNext }) => {
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.8);
  const buttonY = useSharedValue(30);

  useEffect(() => {
    titleOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
    titleY.value = withDelay(600, withSpring(0, { damping: 15 }));
    subtitleOpacity.value = withDelay(1200, withTiming(1, { duration: 800 }));
    buttonOpacity.value = withDelay(1800, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(1800, withSpring(1, { stiffness: 150, damping: 12 }));
    buttonY.value = withDelay(1800, withSpring(0, { damping: 15 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }, { translateY: buttonY.value }],
  }));

  return (
    <LinearGradient
      colors={['#FFFBEB', '#FEF3C7', '#FFFFFF']}
      locations={[0, 0.3, 1]}
      style={styles.container}
    >
      <View style={styles.sunContainer}>
        <SplashSun />
      </View>

      <View style={styles.content}>
        <Animated.Text style={[styles.title, titleStyle]}>
          שמש של חוסן
        </Animated.Text>

        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          נושמים, ממפים, מחזקים.
        </Animated.Text>

        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            style={styles.button}
            onPress={onNext}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>התחלנו</Text>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 52,
    fontFamily: FONTS.bold,
    color: THEME.blue,
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(132, 199, 218, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: FONTS.regular,
    color: '#78716C',
    marginBottom: 48,
    textAlign: 'center',
  },
  button: {
    backgroundColor: THEME.orange,
    paddingHorizontal: 56,
    paddingVertical: 20,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: THEME.orange,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontFamily: FONTS.bold,
    width:'50%'
  },
});
