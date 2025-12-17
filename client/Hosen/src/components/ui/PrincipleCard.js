import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PrincipleCard({ icon, title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#101824',
    borderWidth: 1,
    borderColor: '#233043',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#162235',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#E6EEF8',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'right',
  },
  desc: {
    color: '#AFC0D6',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
    textAlign: 'right',
  },
});
