import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
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

const Button = ({ onPress, variant = 'primary', disabled, children }) => {
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

export default function Index() {
  const [step, setStep] = useState(AppStep.INTRO_SC17);
  const [selections, setSelections] = useState({
    physical: [],
    emotional: [],
    cognitive: [],
    behavioral: [],
  });

  const currentTemp = calculateStressScore(selections);

  const toggleSelection = (category, item) => {
    setSelections((prev) => {
      const list = prev[category];

      if (item === NONE_OPTION) {
        return {
          ...prev,
          [category]: list.includes(NONE_OPTION) ? [] : [NONE_OPTION],
        };
      }

      let newList;
      if (list.includes(item)) {
        newList = list.filter((i) => i !== item);
      } else {
        newList = [...list.filter((i) => i !== NONE_OPTION), item];
      }
      return { ...prev, [category]: newList };
    });
  };

  const hasSelection = (category) => {
    return selections[category].length > 0;
  };

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
          <TouchableOpacity
            onPress={() => setStep(AppStep.PHYSICAL_SC19)}
            activeOpacity={0.8}
          >
            <ThermometerView percentage={0} size="md" />
          </TouchableOpacity>
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

  const renderBehavioralSC22 = () => {
    const items = SCORING_CONFIG.behavioral.map((i) => i.label);

    return (
      <AppLayout
        screenId="SC22"
        footerContent={
          <Button
            variant="secondary"
            onPress={() => setStep(AppStep.DASHBOARD_SC23)}
            disabled={!hasSelection('behavioral')}
          >
            {hasSelection('behavioral') ? 'סיכום' : 'יש לבחור אפשרות'} ✓
          </Button>
        }
      >
        <View style={styles.symptomContainer}>
          <View style={styles.symptomHeader}>
            <View style={styles.symptomHeaderContent}>
              <View
                style={[
                  styles.symptomIconContainer,
                  { backgroundColor: '#F9F08133' },
                ]}
              >
                <User size={24} color="#374151" />
              </View>
              <View>
                <Text style={styles.symptomTitle}>מה רואים מבחוץ?</Text>
                <Text style={styles.symptomSubtitle}>
                  המישור ההתנהגותי
                </Text>
              </View>
            </View>
            <ThermometerView percentage={currentTemp} size="sm" />
          </View>

          <View style={styles.tagsContainer}>
            {items.map((item) => (
              <TagButton
                key={item}
                label={item}
                selected={selections.behavioral.includes(item)}
                onPress={() => toggleSelection('behavioral', item)}
              />
            ))}
            <View style={styles.divider} />
            <TagButton
              label={NONE_OPTION}
              selected={selections.behavioral.includes(NONE_OPTION)}
              onPress={() => toggleSelection('behavioral', NONE_OPTION)}
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

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>הסימנים שזיהית</Text>
          <View style={styles.summaryContent}>
            {hasSelection('physical') &&
              selections.physical[0] !== NONE_OPTION && (
                <View style={styles.summaryItemPhysical}>
                  <Text style={styles.summaryItemText}>
                    <Text style={styles.summaryItemLabelPhysical}>
                      גופני:{' '}
                    </Text>
                    {selections.physical.join(', ')}
                  </Text>
                </View>
              )}
            {hasSelection('emotional') &&
              selections.emotional[0] !== NONE_OPTION && (
                <View style={styles.summaryItemEmotional}>
                  <Text style={styles.summaryItemText}>
                    <Text style={styles.summaryItemLabelEmotional}>
                      רגשי:{' '}
                    </Text>
                    {selections.emotional.join(', ')}
                  </Text>
                </View>
              )}
            {hasSelection('cognitive') &&
              selections.cognitive[0] !== NONE_OPTION && (
                <View style={styles.summaryItemCognitive}>
                  <Text style={styles.summaryItemText}>
                    <Text style={styles.summaryItemLabelCognitive}>
                      שכלי:{' '}
                    </Text>
                    {selections.cognitive.join(', ')}
                  </Text>
                </View>
              )}
            {hasSelection('behavioral') &&
              selections.behavioral[0] !== NONE_OPTION && (
                <View style={styles.summaryItemBehavioral}>
                  <Text style={styles.summaryItemText}>
                    <Text style={styles.summaryItemLabelBehavioral}>
                      התנהגותי:{' '}
                    </Text>
                    {selections.behavioral.join(', ')}
                  </Text>
                </View>
              )}
            {currentTemp === 0 && (
              <Text style={styles.noSymptoms}>לא סומנו סימני לחץ.</Text>
            )}
          </View>
        </View>

        <View style={styles.dashboardActions}>
          <Button
            variant="secondary"
            onPress={() => setStep(AppStep.SCALES_SC24)}
          >
            חוכמת שדרות
          </Button>
          <Button
            variant="outline"
            onPress={() => {
              setSelections({
                physical: [],
                emotional: [],
                cognitive: [],
                behavioral: [],
              });
              setStep(AppStep.INTRO_SC17);
            }}
          >
            התחל מחדש
          </Button>
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
          ההבנה של המצב שלך היא הצעד הראשון לאיזון. הכלים הבאים יעזרו לך להחזיר
          את השליטה.
        </Text>

        <View style={styles.demoEndCard}>
          <Text style={styles.demoEndText}>סוף הדמו לאצבע 2</Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Button variant="outline" onPress={() => setStep(AppStep.INTRO_SC17)}>
            חזרה להתחלה
          </Button>
        </View>
      </View>
    </AppLayout>
  );

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
      return renderBehavioralSC22();
    case AppStep.DASHBOARD_SC23:
      return renderDashboardSC23();
    case AppStep.SCALES_SC24:
      return renderScalesSC24();
    default:
      return renderIntroSC17();
  }
}
const styles = StyleSheet.create({
  /* ========= Buttons ========= */
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#FD954E',
  },
  buttonSecondary: {
    backgroundColor: '#84C7DA',
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextOutline: {
    color: '#6B7280',
  },

  /* ========= Tags ========= */
tagButton: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 20,
  borderWidth: 2,
  marginBottom: 8,
  marginLeft: 8,   // ← כן, שמאל
},
  tagButtonDefault: {
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  tagButtonSelected: {
    backgroundColor: '#84C7DA33',
    borderColor: '#84C7DA',
  },
  tagButtonNoneSelected: {
    backgroundColor: '#4B5563',
    borderColor: '#4B5563',
  },
  tagButtonText: {
  fontSize: 14,
  fontWeight: '500',
  textAlign: 'right',
  writingDirection: 'rtl',
},
  tagButtonTextDefault: {
    color: '#4B5563',
  },
  tagButtonTextSelected: {
    color: '#84C7DA',
  },
  tagButtonTextNoneSelected: {
    color: 'white',
  },

  /* ========= Layout ========= */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ========= Intro ========= */
  introCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderStartWidth: 4,
    borderStartColor: '#84C7DA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  iconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#84C7DA33',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  introSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
    textAlign: 'center',
  },

  /* ========= Normalize ========= */
  normalizeCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 24,
    borderTopWidth: 4,
    borderTopColor: '#84C7DA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  normalizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  normalizeText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  normalizeHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#84C7DA',
    textAlign: 'center',
  },

  /* ========= Thermometer ========= */
  thermometerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },

  /* ========= Symptoms ========= */
  symptomContainer: {
    flex: 1,
    alignItems: 'flex-end', // RTL alignment
  },
  symptomHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  symptomHeaderContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    flex: 1,
  },
  symptomIconContainer: {
    padding: 12,
    borderRadius: 12,
    marginEnd: 12,
  },
  symptomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'right',
  },
  symptomSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },

tagsContainer: {
  flexDirection: 'row',        // חשוב!
  flexWrap: 'wrap',
  justifyContent: 'flex-end',  // דוחף הכל לימין
  alignItems: 'flex-start',
  width: '100%',
},

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },

  /* ========= Dashboard ========= */
  dashboardContainer: {
    flex: 1,
  },
  thermometerCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  temperatureLabel: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },

  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  summaryContent: {
    gap: 8,
  },
  summaryItemText: {
    fontSize: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  /* ========= End Screen ========= */
  scaleIconCircle: {
    width: 128,
    height: 128,
    backgroundColor: '#84C7DA19',
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scaleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  scaleText: {
    fontSize: 18,
    color: '#4B5563',
    lineHeight: 28,
    maxWidth: 300,
    textAlign: 'center',
  },
  demoEndCard: {
    width: '100%',
    padding: 16,
    backgroundColor: '#F9F08133',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F9F081',
  },
  demoEndText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'center',
  },
});
