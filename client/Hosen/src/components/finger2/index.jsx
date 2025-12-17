import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import { AppStep } from './types';
import { AppLayout } from './AppLayout';
import { ThermometerView } from './ThermometerView';
import { SCORING_CONFIG, calculateStressScore } from './scoringConfig';

import {
  Activity,
  Heart,
  Brain,
  User,
  Scale,
} from 'lucide-react-native';

const NONE_OPTION = 'שום דבר';

/* =========================
   Generic Button
========================= */
const Button = ({
  onPress,
  variant = 'primary',
  disabled = false,
  children,
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'outline' && styles.buttonOutline,
    disabled && styles.buttonDisabled,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'outline' && styles.buttonTextOutline,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

/* =========================
   Tag Button
========================= */
const TagButton = ({ label, selected, onPress, isNone }) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.tagButton,
      selected
        ? isNone
          ? styles.tagButtonNoneSelected
          : styles.tagButtonSelected
        : styles.tagButtonDefault,
    ]}
  >
    <Text
      style={[
        styles.tagButtonText,
        selected
          ? isNone
            ? styles.tagButtonTextNoneSelected
            : styles.tagButtonTextSelected
          : styles.tagButtonTextDefault,
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

/* =========================
   Main Screen
========================= */
export default function Index() {
  const [step, setStep] = useState(AppStep.INTRO_SC17);
  const [selections, setSelections] = useState({
    physical: [],
    emotional: [],
    cognitive: [],
    behavioral: [],
  });

  const currentTemp = calculateStressScore(selections);

  const hasSelection = (category) =>
    selections[category] && selections[category].length > 0;

  const toggleSelection = (category, item) => {
    setSelections((prev) => {
      const list = prev[category];

      if (item === NONE_OPTION) {
        return {
          ...prev,
          [category]: list.includes(NONE_OPTION) ? [] : [NONE_OPTION],
        };
      }

      const newList = list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list.filter((i) => i !== NONE_OPTION), item];

      return { ...prev, [category]: newList };
    });
  };

  /* =========================
     Screens
  ========================= */

  const renderIntroSC17 = () => (
    <AppLayout
      screenId="SC17"
      footerContent={
        <Button onPress={() => setStep(AppStep.NORMALIZE_SC18)}>
          התחל ←
        </Button>
      }
    >
      <View style={styles.centerContainer}>
        <View style={styles.introCard}>
          <View style={styles.iconCircle}>
            <Activity size={40} color="#84C7DA" />
          </View>
          <Text style={styles.introTitle}>המדחום - סימני לחץ</Text>
          <Text style={styles.introSubtitle}>
            בפרק זה נתייחס למד חום אישי
          </Text>
          <View style={styles.futureNote}>
            <Text style={styles.futureNoteText}>
              בקרוב: מד חום זוגי ומשפחתי
            </Text>
          </View>
        </View>
      </View>
    </AppLayout>
  );

  const renderNormalizeSC18 = () => (
    <AppLayout
      screenId="SC18"
      footerContent={
        <Button onPress={() => setStep(AppStep.PHYSICAL_SC19)}>
          מתחילים לבדוק
        </Button>
      }
    >
      <View style={styles.centerContainer}>
        <View style={styles.normalizeCard}>
          <Text style={styles.normalizeTitle}>זה נורמלי להרגיש ככה</Text>
          <Text style={styles.normalizeText}>
            זה לא אומר שמשהו לא בסדר איתך, זה אומר שהמערכת שלך בגיוס גבוה.
          </Text>
          <Text style={styles.normalizeHighlight}>
            בואו נבדוק את הטמפרטורה.
          </Text>
        </View>

        <View style={styles.thermometerCenter}>
          <ThermometerView percentage={0} size="md" />
        </View>
      </View>
    </AppLayout>
  );

  const renderSymptomScreen = (
    title,
    subtitle,
    category,
    nextStep,
    Icon,
    accentColor,
    screenId
  ) => {
    const items = SCORING_CONFIG[category].map((i) => i.label);

    return (
      <AppLayout
        screenId={screenId}
        footerContent={
          <Button
            onPress={() => setStep(nextStep)}
            disabled={!hasSelection(category)}
          >
            {hasSelection(category) ? 'המשך' : 'יש לבחור אפשרות'} ←
          </Button>
        }
      >
        <View style={styles.symptomContainer}>
          <View style={styles.symptomHeader}>
            <View style={styles.symptomHeaderContent}>
              <View
                style={[
                  styles.symptomIconContainer,
                  { backgroundColor: `${accentColor}33` },
                ]}
              >
                <Icon size={24} color={accentColor} />
              </View>
              <View>
                <Text style={styles.symptomTitle}>{title}</Text>
                <Text style={styles.symptomSubtitle}>{subtitle}</Text>
              </View>
            </View>
            <ThermometerView percentage={currentTemp} size="sm" />
          </View>

          <View style={styles.tagsContainer}>
            {items.map((item) => (
              <TagButton
                key={item}
                label={item}
                selected={selections[category].includes(item)}
                onPress={() => toggleSelection(category, item)}
              />
            ))}
            <View style={styles.divider} />
            <TagButton
              label={NONE_OPTION}
              selected={selections[category].includes(NONE_OPTION)}
              onPress={() => toggleSelection(category, NONE_OPTION)}
              isNone
            />
          </View>
        </View>
      </AppLayout>
    );
  };

  const renderDashboardSC23 = () => (
    <AppLayout title="סיכום המדדים שלך" screenId="SC23">
      <View style={styles.dashboardContainer}>
        <View style={styles.thermometerCard}>
          <ThermometerView percentage={currentTemp} size="md" />
          <Text style={styles.temperatureLabel}>
            {Math.round(currentTemp)}% רמת לחץ
          </Text>
        </View>
      </View>
    </AppLayout>
  );

  const renderScalesSC24 = () => (
    <AppLayout screenId="SC24">
      <View style={styles.centerContainer}>
        <View style={styles.scaleIconCircle}>
          <Scale size={64} color="#84C7DA" />
        </View>
        <Text style={styles.scaleTitle}>איזון הוא המפתח</Text>
        <Text style={styles.scaleText}>
          ההבנה של המצב שלך היא הצעד הראשון לאיזון.
        </Text>

        <Button variant="outline" onPress={() => setStep(AppStep.INTRO_SC17)}>
          חזרה להתחלה
        </Button>
      </View>
    </AppLayout>
  );

  /* =========================
     Router
  ========================= */
  switch (step) {
    case AppStep.INTRO_SC17:
      return renderIntroSC17();
    case AppStep.NORMALIZE_SC18:
      return renderNormalizeSC18();
    case AppStep.PHYSICAL_SC19:
      return renderSymptomScreen(
        'איך הגוף מגיב?',
        'האזעקה של הגוף',
        'physical',
        AppStep.EMOTIONAL_SC20,
        Activity,
        '#71A674',
        'SC19'
      );
    case AppStep.EMOTIONAL_SC20:
      return renderSymptomScreen(
        'מה הלב מרגיש?',
        'הסופה הרגשית',
        'emotional',
        AppStep.COGNITIVE_SC21,
        Heart,
        '#FD954E',
        'SC20'
      );
    case AppStep.COGNITIVE_SC21:
      return renderSymptomScreen(
        'איך הראש עובד?',
        'הערפל בראש',
        'cognitive',
        AppStep.BEHAVIORAL_SC22,
        Brain,
        '#84C7DA',
        'SC21'
      );
    case AppStep.BEHAVIORAL_SC22:
      return renderSymptomScreen(
        'מה רואים מבחוץ?',
        'המישור ההתנהגותי',
        'behavioral',
        AppStep.DASHBOARD_SC23,
        User,
        '#374151',
        'SC22'
      );
    case AppStep.DASHBOARD_SC23:
      return renderDashboardSC23();
    case AppStep.SCALES_SC24:
      return renderScalesSC24();
    default:
      return renderIntroSC17();
  }
}

/* =========================
   Styles (ללא שינוי)
========================= */
const styles = StyleSheet.create({
  /* כל ה-styles שלך 그대로 */
});
