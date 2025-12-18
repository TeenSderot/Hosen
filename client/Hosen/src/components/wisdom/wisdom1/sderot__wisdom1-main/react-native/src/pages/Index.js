import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import ResilienceCard from '../components/ResilienceCard';
import InsightBox from '../components/InsightBox';

export default function Index() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.hero}>
        <Text style={styles.title}>משולש החוסן</Text>
        <Text style={styles.subtitle}>הערכת חוסן אישי ומשפחתי</Text>
      </View>

      <View style={styles.cardsContainer}>
        <ResilienceCard
          title="יציבות"
          percentage={87}
          subtitle="התנהגות"
          description="שמירה על שגרת יומיום מסודרת ויציבה"
          variant="behavior"
          delay={0}
        />

        <ResilienceCard
          title="ביטחון"
          percentage={81}
          subtitle="רגשות"
          description="תחושת ביטחון ויכולת להרגיש בטוח"
          variant="emotional"
          delay={200}
        />

        <ResilienceCard
          title="הורות"
          percentage={72}
          subtitle="קוגניציה"
          description="יכולת לתת מענה מספק לצרכי הילדים"
          variant="cognitive"
          delay={400}
        />
      </View>

      <InsightBox>
        <Text style={styles.insightText}>
          התוצאות מצביעות על רמת חוסן גבוהה במיוחד בתחום ההתנהגותי,
          תוך שמירה על איזון טוב בין כל שלושת המימדים של החוסן האישי והמשפחתי.
        </Text>
      </InsightBox>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
  },
  hero: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  insightText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#78716c',
    textAlign: 'right',
  },
});
