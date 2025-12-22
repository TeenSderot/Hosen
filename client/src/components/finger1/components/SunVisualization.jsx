import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Stop, Circle, Path, G } from 'react-native-svg';
import { StressLevel, THEME, FONTS } from '../types';

export const SunVisualization = ({
  stressors,
  size = 300,
  animate = true,
  showLabels = false,
}) => {
  const centerRadius = size * 0.15;
  const rayLength = size * 0.28;
  const cx = size / 2;
  const cy = size / 2;
  const isCrowded = stressors.length > 10;

  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (animate) {
      pulseScale.value = withRepeat(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      glowOpacity.value = withRepeat(
        withTiming(0.7, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [animate]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const generateRayPath = (angle, length, baseWidth) => {
    const angleRad = (angle - 90) * (Math.PI / 180);
    const startX = cx + Math.cos(angleRad) * (centerRadius + 2);
    const startY = cy + Math.sin(angleRad) * (centerRadius + 2);
    const endX = cx + Math.cos(angleRad) * (centerRadius + length);
    const endY = cy + Math.sin(angleRad) * (centerRadius + length);

    const perpAngle = angleRad + Math.PI / 2;
    const halfBase = baseWidth / 2;
    const tipWidth = baseWidth * 0.15;

    const baseLeft = {
      x: startX + Math.cos(perpAngle) * halfBase,
      y: startY + Math.sin(perpAngle) * halfBase,
    };
    const baseRight = {
      x: startX - Math.cos(perpAngle) * halfBase,
      y: startY - Math.sin(perpAngle) * halfBase,
    };
    const tipLeft = {
      x: endX + Math.cos(perpAngle) * tipWidth,
      y: endY + Math.sin(perpAngle) * tipWidth,
    };
    const tipRight = {
      x: endX - Math.cos(perpAngle) * tipWidth,
      y: endY - Math.sin(perpAngle) * tipWidth,
    };

    return `M ${baseLeft.x} ${baseLeft.y}
            Q ${(baseLeft.x + tipLeft.x) / 2 + Math.cos(perpAngle) * 3} ${(baseLeft.y + tipLeft.y) / 2 + Math.sin(perpAngle) * 3} ${tipLeft.x} ${tipLeft.y}
            L ${tipRight.x} ${tipRight.y}
            Q ${(baseRight.x + tipRight.x) / 2 - Math.cos(perpAngle) * 3} ${(baseRight.y + tipRight.y) / 2 - Math.sin(perpAngle) * 3} ${baseRight.x} ${baseRight.y}
            Z`;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.svgContainer, pulseStyle]}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <RadialGradient id="sunGradient" cx="40%" cy="40%" r="60%">
              <Stop offset="0%" stopColor="#FEF08A" />
              <Stop offset="50%" stopColor="#FCD34D" />
              <Stop offset="100%" stopColor={THEME.orange} />
            </RadialGradient>
            <RadialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#FCD34D" stopOpacity="0.6" />
              <Stop offset="70%" stopColor={THEME.orange} stopOpacity="0.2" />
              <Stop offset="100%" stopColor={THEME.orange} stopOpacity="0" />
            </RadialGradient>
            <RadialGradient id="rayGradient" cx="50%" cy="0%" r="100%">
              <Stop offset="0%" stopColor="#FCD34D" />
              <Stop offset="100%" stopColor={THEME.orange} />
            </RadialGradient>
            <RadialGradient id="releasedRayGradient" cx="50%" cy="0%" r="100%">
              <Stop offset="0%" stopColor="#CBD5E1" />
              <Stop offset="100%" stopColor="#94A3B8" />
            </RadialGradient>
          </Defs>

          <Circle cx={cx} cy={cy} r={centerRadius * 1.8} fill="url(#glowGradient)" />

          {stressors.map((stressor, index) => {
            const angle = (index / stressors.length) * 360;
            const isReleased = stressor.level === StressLevel.RELEASED;
            const baseWidth = isReleased ? size * 0.04 : size * 0.06;
            const length = isReleased ? rayLength * 0.7 : rayLength;
            const path = generateRayPath(angle, length, baseWidth);

            return (
              <Path
                key={stressor.id}
                d={path}
                fill={isReleased ? 'url(#releasedRayGradient)' : 'url(#rayGradient)'}
                opacity={isReleased ? 0.4 : 1}
              />
            );
          })}

          <Circle
            cx={cx}
            cy={cy}
            r={centerRadius}
            fill="url(#sunGradient)"
            stroke="white"
            strokeWidth={3}
          />

          <Circle
            cx={cx - centerRadius * 0.25}
            cy={cy - centerRadius * 0.25}
            r={centerRadius * 0.15}
            fill="rgba(255,255,255,0.4)"
          />
        </Svg>
      </Animated.View>

      {showLabels && stressors.map((stressor, index) => {
        if (stressor.level === StressLevel.RELEASED) return null;

        const angle = (index / stressors.length) * 360;
        const angleRad = (angle - 90) * (Math.PI / 180);
        const labelDistance = centerRadius + rayLength + 20;
        const labelX = cx + Math.cos(angleRad) * labelDistance;
        const labelY = cy + Math.sin(angleRad) * labelDistance;

        const isEven = index % 2 === 0;
        const extraDistance = isCrowded && !isEven ? 25 : 0;
        const finalX = labelX + Math.cos(angleRad) * extraDistance;
        const finalY = labelY + Math.sin(angleRad) * extraDistance;

        const maxChars = isCrowded ? 16 : 22;
        const truncatedText = stressor.text.length > maxChars
          ? stressor.text.substring(0, maxChars) + '..'
          : stressor.text;

        return (
          <View
            key={`label-${stressor.id}`}
            style={[
              styles.label,
              {
                position: 'absolute',
                left: finalX - 55,
                top: finalY - 12,
              },
            ]}
          >
            <Text style={styles.labelText}>{truncatedText}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7AA',
    width: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labelText: {
    fontSize: 10,
    fontFamily: FONTS.bold,
    color: '#374151',
    textAlign: 'center',
  },
});
