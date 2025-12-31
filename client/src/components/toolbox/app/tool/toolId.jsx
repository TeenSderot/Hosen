import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { categories, tools } from '../../data/toolboxData';
import { useFavorites } from '../../hooks/useFavorites';
import { Card } from '../../components/Card';
import { Pill } from '../../components/Pill';
import { Colors, cardColors } from '../../colors';

export default function ToolDetail() {
  const router = useRouter();
  const { toolId } = useLocalSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const tool = tools.find((t) => t.id === toolId);
  const category = tool ? categories.find((c) => c.id === tool.categoryId) : null;

  const toggleStep = (index) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  if (!tool) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>כלי לא נמצא</Text>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>חזרה</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>חזרה</Text>
        </TouchableOpacity> */}
        <Text style={styles.title}>{tool.title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleFavorite(tool.id)}
        >
          <Text style={styles.buttonText}>
            {isFavorite(tool.id) ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card accentColor={cardColors[0]}>
          <View style={styles.pillRow}>
            <Pill>
              {tool.tagEmoji} {tool.tag}
            </Pill>
            {tool.duration && (
              <Pill>⏱️ {tool.duration}</Pill>
            )}
            {category && (
              <Pill>
                {category.emoji} {category.title}
              </Pill>
            )}
          </View>
          <Text style={styles.description}>{tool.description}</Text>
        </Card>

        {tool.id === 'breathing' && (
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={() => router.push('/exercise/breathing')}
          >
            <Text style={styles.exerciseButtonArrow}>◀</Text>
            <View style={styles.exerciseButtonContent}>
              <Text style={styles.exerciseButtonTitle}>התחל מנוע נשימות</Text>
              <Text style={styles.exerciseButtonSubtitle}>
                תרגיל מודרך עם אנימציה חזותית
              </Text>
            </View>
            <Text style={styles.exerciseButtonEmoji}>🫁</Text>
          </TouchableOpacity>
        )}

        {tool.id === 'movement' && (
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={() => router.push('/exercise/yoga')}
          >
            <Text style={styles.exerciseButtonArrow}>◀</Text>
            <View style={styles.exerciseButtonContent}>
              <Text style={styles.exerciseButtonTitle}>התחל תרגיל יוגה</Text>
              <Text style={styles.exerciseButtonSubtitle}>
                תרגיל מודרך של 5 דקות עם 10 תנוחות
              </Text>
            </View>
            <Text style={styles.exerciseButtonEmoji}>🧘</Text>
          </TouchableOpacity>
        )}

        {tool.id === 'relaxation' && (
          <TouchableOpacity
            style={styles.exerciseButton}
            onPress={() => router.push('/exercise/stretching')}
          >
            <Text style={styles.exerciseButtonArrow}>◀</Text>
            <View style={styles.exerciseButtonContent}>
              <Text style={styles.exerciseButtonTitle}>התחל תרגילי מתיחות</Text>
              <Text style={styles.exerciseButtonSubtitle}>
                13 תרגילי מתיחות מודרכים להרפיית שרירים מלאה
              </Text>
            </View>
            <Text style={styles.exerciseButtonEmoji}>💆</Text>
          </TouchableOpacity>
        )}

        {tool.why && (
          <Card accentColor={cardColors[1]}>
            <Text style={styles.sectionTitle}>למה זה עובד</Text>
            <Text style={styles.sectionText}>{tool.why}</Text>
          </Card>
        )}

        {tool.howSteps && tool.howSteps.length > 0 && (
          <Card accentColor={cardColors[2]}>
            <Text style={styles.sectionTitle}>איך עושים</Text>
            {tool.howSteps.map((step, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.stepRow}
                onPress={() => toggleStep(idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.stepCheckbox}>
                  {completedSteps.has(idx) ? '☑' : '☐'}
                </Text>
                <Text
                  style={[
                    styles.stepText,
                    completedSteps.has(idx) && styles.stepTextCompleted,
                  ]}
                >
                  {step}
                </Text>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {tool.emotions && tool.emotions.length > 0 && (
          <Card accentColor={cardColors[3]}>
            <Text style={styles.sectionTitle}>מתאים כשמרגישים</Text>
            <View style={styles.pillRow}>
              {tool.emotions.map((emotion) => (
                <Pill key={emotion}>#{emotion}</Pill>
              ))}
            </View>
          </Card>
        )}

        {tool.quote && (
          <Card accentColor={cardColors[4]}>
            <Text style={styles.quoteTitle}>{tool.quote.title}</Text>
            <Text style={styles.quoteText}>"{tool.quote.text}"</Text>
          </Card>
        )}

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.actionButtonText}>חזרה לארגז</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/favorites')}
          >
            <Text style={styles.actionButtonText}>למועדפים</Text>
          </TouchableOpacity>
        </View>
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    minWidth: 50,
    alignItems: 'center',
  },
  buttonText: {
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
    paddingHorizontal: 8,
    fontFamily: 'Rubik-Bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
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
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 12,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'right',
  },
  sectionText: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  stepCheckbox: {
    fontSize: 24,
    color: Colors.primary,
    marginRight: 12,
    lineHeight: 24,
  },
  stepText: {
    fontSize: 15,
    color: Colors.text.secondary,
    flex: 1,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  stepTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  quoteTitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 8,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  quoteText: {
    fontSize: 16,
    color: Colors.text.primary,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: 'Rubik-Medium',
    textAlign: 'right',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 15,
    color: Colors.text.primary,
    fontFamily: 'Rubik-Medium',
  },
  exerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  exerciseButtonEmoji: {
    fontSize: 40,
    marginLeft: 16,
  },
  exerciseButtonContent: {
    flex: 1,
  },
  exerciseButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
    fontFamily: 'Rubik-Bold',
    textAlign: 'right',
  },
  exerciseButtonSubtitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
  },
  exerciseButtonArrow: {
    fontSize: 24,
    color: Colors.white,
    marginRight: 12,
  },
});
