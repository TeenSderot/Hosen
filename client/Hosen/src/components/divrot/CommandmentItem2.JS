import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

interface CommandmentItemProps {
  id: number;
  title: string;
  color: string;
  onClick: () => void;
  delay?: number;
}

const colorClasses: Record<string, string> = {
  "notebook-green": "#34D399", // Example color code
  "notebook-lime": "#A3E635",
  "notebook-orange": "#FB923C",
  "notebook-blue": "#3B82F6",
  "notebook-yellow": "#FBBF24",
};

const CommandmentItem = ({ id, title, color, onClick, delay = 0 }: CommandmentItemProps) => {
  return (
    <Pressable
      onPress={onClick}
      style={[styles.commandmentItem, { animationDelay: `${delay}ms` }]}
    >
      {/* Colored accent bar on right */}
      <View style={[styles.accentBar, { backgroundColor: colorClasses[color] || "#3B82F6" }]} />

      {/* Chevron indicator on left */}
      <ChevronLeft style={styles.chevronIcon} />

      {/* Title */}
      <Text style={styles.title}>
        {title}
      </Text>

      {/* Number badge */}
      <View style={[styles.badge, { backgroundColor: colorClasses[color] || "#3B82F6" }]}>
        <Text style={styles.badgeText}>{id}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  commandmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F9FAFB', // Card color
    borderWidth: 1,
    borderColor: '#E5E7EB', // Border color
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 8,
    borderRadius: 100,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    color: '#6B7280', // Muted color
    transform: [{ translateX: 0 }],
  },
  title: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '500',
    color: '#111827', // Foreground text color
    paddingRight: 8,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1 }],
  },
  badgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CommandmentItem;
