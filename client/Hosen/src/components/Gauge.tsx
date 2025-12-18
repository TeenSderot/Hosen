import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface GaugeProps {
  label: string;
  value: number;
  icon?: string;
  delay?: number;
  displayValue?: string;
}

const COLORS = {
  excellent: '#71A674',
  good: '#D1E38F',
  ok: '#84C7DA',
  attention: '#F9F081',
  critical: '#FD954E',
};

const getColorByValue = (value: number) => {
  if (value >= 80) return 'excellent';
  if (value >= 60) return 'good';
  if (value >= 40) return 'ok';
  if (value >= 20) return 'attention';
  return 'critical';
};

const getColor = (value: number) => {
  const status = getColorByValue(value);
  return COLORS[status];
};

const getStatusText = (value: number): string => {
  if (value >= 80) return 'מצוין';
  if (value >= 60) return 'טוב';
  if (value >= 40) return 'בסדר';
  if (value >= 20) return 'דורש תשומת לב';
  return 'קריטי';
};

export const Gauge = ({ label, value, icon, delay = 0, displayValue }: GaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const size = 160;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI;

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
      let start = 0;
      const duration = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = easeOut * value;
        setAnimatedValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, value]);

  const progress = (animatedValue / 100) * circumference;
  const color = getColor(animatedValue);

  return (
    <View style={[styles.container, { opacity }]}>
      <View style={styles.gaugeWrapper}>
        <Svg width={size} height={size / 2 + 20}>
          <Path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Path
            d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </Svg>
        <View style={styles.valueContainer}>
          <Text style={[styles.valueText, { color }]}>
            {displayValue || `${Math.round(animatedValue)}%`}
          </Text>
        </View>
      </View>
      <View style={styles.labelContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {icon && <Text style={styles.icon}>{icon}</Text>}
        </View>
        <View style={[styles.statusBadge, { borderColor: color }]}>
          <Text style={[styles.statusText, { color }]}>
            {getStatusText(Math.round(animatedValue))}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  gaugeWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  valueContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 32,
    fontFamily: 'Rubik-Regular',
  },
  labelContainer: {
    marginTop: 6,
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Rubik-SemiBold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
  },
});
