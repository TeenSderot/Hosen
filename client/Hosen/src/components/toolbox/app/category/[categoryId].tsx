import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { categories, tools } from '@/data/toolboxData';
import { Card } from '@/components/Card';
import { Pill } from '@/components/Pill';
import { Colors, cardColors } from '@/constants/colors';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function CategoryFeed() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const category = categories.find((c) => c.id === categoryId);
  const categoryTools = tools.filter((t) => t.categoryId === categoryId);

  if (!category) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>קטגוריה לא נמצאה</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>חזרה</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>חזרה</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {category.emoji} {category.title}
        </Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.description}>{category.description}</Text>

        {categoryTools.map((tool, index) => (
          <Card
            key={tool.id}
            onPress={() => router.push(`/tool/${tool.id}`)}
            accentColor={cardColors[index % cardColors.length]}
          >
            <View style={styles.toolRow}>
              <View style={styles.toolContent}>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDescription}>{tool.description}</Text>
                <View style={styles.pillRow}>
                  <Pill>
                    {tool.tagEmoji} {tool.tag}
                  </Pill>
                  {tool.duration && (
                    <Pill>⏱️ {tool.duration}</Pill>
                  )}
                </View>
              </View>
              <Text style={styles.arrow}></Text>
            </View>
          </Card>
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
  header: {
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  backButtonText: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: 'Rubik-Medium',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 16,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  toolRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  toolContent: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 6,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'right',
  },
  toolDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 10,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  arrow: {
    fontSize: 18,
    color: Colors.text.light,
    marginRight: 12,
  },
});
