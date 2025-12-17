import React from 'react';
import { View, Text } from 'react-native';
import { AppLayout } from './AppLayout';

export default function SmartSderotScreen() {
  return (
    <AppLayout title="חכמת שדרות">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, textAlign: 'right' }}>
          מסך חכמת שדרות - תכנים נוספים יתווספו כאן.
        </Text>
      </View>
    </AppLayout>
  );
}