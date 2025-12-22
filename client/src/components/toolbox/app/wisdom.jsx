import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';

import { communityTips } from '../data/toolboxData';
import { Card } from '../components/Card';
import { Colors, cardColors } from '../colors';
import { useNavigation } from '@react-navigation/native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function CommunityWisdom() {
  const navigation = useNavigation()
  const groups = useMemo(() => {
    const g = new Map();

    for (const tip of communityTips) {
      if (!g.has(tip.category)) {
        g.set(tip.category, []);
      }
      g.get(tip.category).push(tip);
    }

    return Array.from(g.entries());
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {navigation.navigate('toolbox')}}
        >
          <Text style={styles.backButtonText}>חזרה</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>💡 חוכמת ההמונים</Text>

        <View style={styles.spacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>
            טיפים אמיתיים מאנשים – דברים קטנים שעזרו להם.
          </Text>
        </View>

        {groups.map(([category, tips], groupIndex) => (
          <View key={category} style={styles.section}>
            <Text style={styles.categoryTitle}>{category}</Text>

            {tips.map((tip, tipIndex) => (
              <Card
                key={tip.id}
                accentColor={
                  cardColors[(groupIndex + tipIndex) % cardColors.length]
                }
              >
                <Text style={styles.tipText}>{tip.text}</Text>
              </Card>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 48,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  backButtonText: {
    fontSize: 15,
    color: Colors.text.primary,
    fontFamily: 'Rubik-Medium',
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.text.primary,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
  },
  spacer: {
    width: 60,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
  section: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 16,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'right',
  },
  tipText: {
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 24,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
});
