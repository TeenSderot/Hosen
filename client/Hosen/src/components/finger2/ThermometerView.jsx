import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

export const ThermometerView = ({ percentage, size = 'md' }) => {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayPercent(percentage);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const getColor = (p) => {
    if (p < 30) return '#84C7DA';
    if (p < 60) return '#F9F081';
    return '#FD954E';
  };

  const currentColor = getColor(displayPercent);

  const width = size === 'sm' ? 40 : size === 'lg' ? 80 : 60;
  const height = size === 'sm' ? 100 : size === 'lg' ? 320 : 200;
  const bulbRadius = width / 2;
  const stemWidth = width * 0.5;
  const stemHeight = height - bulbRadius * 2;

  const maxLiquidHeight = stemHeight - 10;
  const currentLiquidHeight = (displayPercent / 100) * maxLiquidHeight;

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Path
          d={`
            M${(width - stemWidth) / 2},${bulbRadius}
            v${stemHeight - 10}
            a${bulbRadius},${bulbRadius} 0 1,1 ${stemWidth},0
            v-${stemHeight - 10}
            a${stemWidth / 2},${stemWidth / 2} 0 0,0 -${stemWidth},0
            z
          `}
          fill="#F3F4F6"
          stroke="#E5E7EB"
          strokeWidth="2"
        />

        <Circle
          cx={width / 2}
          cy={height - bulbRadius}
          r={bulbRadius - 6}
          fill={currentColor}
        />

        <Rect
          x={(width - stemWidth) / 2 + 6}
          y={height - bulbRadius - currentLiquidHeight}
          width={stemWidth - 12}
          height={currentLiquidHeight + 10}
          fill={currentColor}
        />

        <Line
          x1={width * 0.7}
          y1={height * 0.7}
          x2={width * 0.85}
          y2={height * 0.7}
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <Line
          x1={width * 0.7}
          y1={height * 0.5}
          x2={width * 0.85}
          y2={height * 0.5}
          stroke="#CBD5E1"
          strokeWidth="2"
        />
       <Line
          x1={width * 0.7}
          y1={height * 0.3}
          x2={width * 0.85}
          y2={height * 0.3}
          stroke="#CBD5E1"
          strokeWidth="2"
        />
      </Svg>
      {size === 'lg' && (
        <Text style={styles.label}>{Math.round(displayPercent)}°C</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#374151',
  },
});


