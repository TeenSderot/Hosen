import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  I18nManager,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ResilienceCard } from '../components/ResilienceCard';
import { InsightBox } from '../components/InsightBox';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  return (
    <LinearGradient
      colors={['#F8F9FA', '#E8F5E9']}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>משולש החוסן</Text>
          <Text style={styles.heroSubtitle}>
            מעקב אחר אינדיקטורים מוקדמים למצוקה בקרב עובדים
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <ResilienceCard
            title="שינויים התנהגותיים"
            percentage={88}
            subtitle="אינדיקטור ראשוני"
            description="שינויים בדפוסי העבודה והתנהגות יכולים להעיד על מצוקה מוקדמת"
            variant="behavior"
            delay={0}
          />

          <ResilienceCard
            title="מצוקה רגשית"
            percentage={86}
            subtitle="אינדיקטור משני"
            description="סימני מתח רגשי ולחץ המצביעים על הידרדרות במצב הנפשי"
            variant="emotional"
            delay={100}
          />

          <ResilienceCard
            title="ערפול קוגניטיבי"
            percentage={83}
            subtitle="אינדיקטור מאוחר"
            description="ירידה ביכולת הריכוז וקבלת ההחלטות - סימן למצוקה מתקדמת"
            variant="cognitive"
            delay={200}
          />
        </View>

        <InsightBox title="תובנה מרכזית">
          זיהוי מוקדם של שינויים התנהגותיים מאפשר התערבות מונעת לפני התפתחות מצוקה
          משמעותית. מערכת המעקב מזהה דפוסים חריגים ומאפשרת תגובה מהירה של הארגון.
        </InsightBox>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            נתונים מעודכנים לשנת 2024
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xl,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.md,
    writingDirection: 'rtl',
  },
  heroSubtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: FONT_SIZES.lg * 1.5,
    writingDirection: 'rtl',
  },
  cardsContainer: {
    marginVertical: SPACING.lg,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingVertical: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});
