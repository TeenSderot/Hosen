import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Gauge } from './Gauge';

interface FamilyMember {
  id: string;
  name: string;
  value: number;
  icon: string;
}

const familyMembers: FamilyMember[] = [
  { id: 'children', name: 'ילדים', value: 72, icon: '👶' },
  { id: 'caregiver', name: 'מסכל/ת', value: 90, icon: '👨‍🦱' },
  { id: 'grandparents', name: 'סבתא וסבא', value: 56, icon: '👵' },
  { id: 'spouse', name: 'בן/ת זוג', value: 39, icon: '💚' },
];

const LEGEND_ITEMS = [
  { color: '#71A674', label: '80-100% מצוין' },
  { color: '#D1E38F', label: '60-79% טוב' },
  { color: '#84C7DA', label: '40-59% בסדר' },
  { color: '#F9F081', label: '20-39% דורש תשומת לב' },
  { color: '#FD954E', label: '0-19% קריטי' },
];

export const Dashboard = () => {
  const [headerOpacity, setHeaderOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setHeaderOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.title}>לוח המחוונים המשפחתי</Text>
        <Text style={styles.subtitle}>
          כמו שעונים במכונית - עקוב אחרי מצבם של בני המשפחה.
        </Text>
        <Text style={styles.subtitleHighlight}>יד על הדופק, תמיד.</Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.gaugesGrid}>
          <View style={styles.rowContainer}>
            <View style={styles.gaugeItem}>
              <Gauge
                label={familyMembers[0].name}
                value={familyMembers[0].value}
                icon={familyMembers[0].icon}
                delay={0}
              />
            </View>
            <View style={styles.gaugeItem}>
              <Gauge
                label={familyMembers[1].name}
                value={familyMembers[1].value}
                icon={familyMembers[1].icon}
                delay={150}
              />
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.gaugeItem}>
              <Gauge
                label={familyMembers[2].name}
                value={familyMembers[2].value}
                icon={familyMembers[2].icon}
                delay={300}
              />
            </View>
            <View style={styles.gaugeItem}>
              <Gauge
                label={familyMembers[3].name}
                value={familyMembers[3].value}
                icon={familyMembers[3].icon}
                delay={450}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legend}>
          {LEGEND_ITEMS.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          האנשים שמרכיבים את המארג הקבוע של המשפחה ראויים להערכה מתמדת של מצבם. ההורים, שמכירים את ילדיהם טוב מכולם, נחשפים לשינויים לא רק בשגרה אלא גם בתקופות מאתגרות: לפני מבחנים, סביב אירועים חריגים, במצבי חירום כמו צבע אדום או כל התמודדות אחרת.
        </Text>
        <Text style={[styles.descriptionText, { marginTop: 16 }]}>
          גם כאן נדרש להיות עם היד על הדופק. לרוב אין הפתעות, ולעיתים אף מתגלות הפתעות נעימות – ילד שהתבגר, לקח אחריות או הפך לשותף אמיתי בנטל המשפחתי. אך התעלמות משינויים עלולה להוביל בזמן חירום להפתעות פחות רצויות.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Rubik-Bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  subtitleHighlight: {
    color: '#71A674',
    fontSize: 15,
    fontFamily: 'Rubik-SemiBold',
    textAlign: 'center',
    marginTop: 4,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  gaugesGrid: {
    alignItems: 'center',
  },
  singleRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  gaugeItem: {
    width: '50%',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  legendContainer: {
    marginTop: 24,
    paddingHorizontal: 12,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
  },
  descriptionContainer: {
    marginTop: 32,
    paddingHorizontal: 8,
  },
  descriptionText: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    lineHeight: 24,
    textAlign: 'center',
  },
});
