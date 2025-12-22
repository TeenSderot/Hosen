import React from 'react';
import { View, Text } from 'react-native';

export const InsightBox = ({ children }) => {
  return (
    <View style={{
      marginTop: 32,
      padding: 20,
      borderRadius: 16,
      borderWidth: 2,
      backgroundColor: '#D7F7F8',
      borderColor: '#A8DBDE',
      position: 'relative',
    }}>
      <View style={{
        position: 'absolute',
        top: -12,
        right: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#A8DBDE',
      }}>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#1E4D3D',
        }}>
          תובנה לסיכום
        </Text>
      </View>
      <View style={{ marginTop: 8 }}>
        {children}
      </View>
    </View>
  );
};
