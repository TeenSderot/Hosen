import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from './PieChart';

const variantColors = {
  behavior: {
    main: '#D1E38F',
    bg: '#E8F0D5',
    text: '#5A7A3C',
  },
  emotional: {
    main: '#75B8D2',
    bg: '#D4EDF7',
    text: '#2C5F7A',
  },
  cognitive: {
    main: '#F9A85E',
    bg: '#FEECD6',
    text: '#9C5E2F',
  },
};

export const ResilienceCard = ({
  title,
  percentage,
  subtitle,
  description,
  variant
}) => {
  const colors = variantColors[variant];

  return (
    <View style={{
      borderRadius: 16,
      padding: 20,
      borderWidth: 2,
      borderColor: colors.bg,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }}>
      {/* Header */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          textAlign: 'center',
          color: '#1E4D3D',
          lineHeight: 24,
        }}>
          {title}
        </Text>
        <Text style={{
          fontSize: 12,
          color: '#6B8575',
          textAlign: 'center',
          marginTop: 4,
        }}>
          {subtitle}
        </Text>
      </View>

      {/* Pie Chart */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <PieChart
          percentage={percentage}
          size={128}
          color={colors.main}
          backgroundColor={colors.bg}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
          }}>
            {percentage}%
          </Text>
        </View>
      </View>

      {/* Description */}
      <Text style={{
        fontSize: 14,
        color: '#3D6B5C',
        lineHeight: 22,
        textAlign: 'center',
      }}>
        {description}
      </Text>
    </View>
  );
};
