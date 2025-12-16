import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import ChecklistItem from '../components/ui/ChecklistItem';
import Button from '../components/ui/Button';
import { remove, setString } from '../lib/storage';

const tabs = [
  {
    key: 'leaving',
    label: 'יוצאים',
    title: 'בדרך החוצה',
    phrases: [
      '"אנחנו עומדים לצאת מהבית ונעשה את זה הכי מהר שאפשר."',
      '"אנחנו נשמור עליכם בדרך למכונית/לאוטובוס."',
      '"היכנסו למכונית ושבו על הרצפה/בכיסא – זה הכי בטוח עכשיו."',
      '"חיילים מלווים אותנו בדרך ושומרים עלינו."',
      '"אנחנו נוסעים למקום בטוח ונעים יותר."',
    ],
  },
  {
    key: 'arrived',
    label: 'הגענו',
    title: 'התמקמות במקום בטוח',
    phrases: [
      '"הגענו! אנחנו במקום בטוח."',
      '"כל הכבוד לנו, עשינו דרך ארוכה והצלחנו."',
      '"בואו נסדר את החדר/הפינה שלנו שיהיה לנו נעים."',
      '"אנחנו נשארים ביחד כל הזמן."',
      '"אם אתם צריכים משהו, תגידו לנו מיד."',
    ],
  },
  {
    key: 'crisis',
    label: 'משבר',
    title: 'מתמודדים עם קושי',
    tip: '💡 טיפ: לא להגיד סתם "יהיה בסדר", תנו מקום לקושי.',
    phrases: [
      '"אני רואה שקשה לך, זה הגיוני להרגיש ככה."',
      '"זה קשה להיות רחוק מהבית, אבל עכשיו זה המקום הכי בטוח."',
      '"אל תשמרו בבטן – ספרו לנו מה אתם מרגישים."',
      '"אנחנו גאים בכם מאוד על איך שאתם מתמודדים."',
      '"אנחנו משפחה חזקה, אנחנו נמצא פתרון ביחד."',
    ],
  },
  {
    key: 'returning',
    label: 'חוזרים',
    title: 'החזרה לשגרה',
    phrases: [
      '"אנחנו בבית שלנו, דברים מתקדמים לטובה."',
      '"ייקח קצת זמן להתרגל חזרה, וזה בסדר גמור."',
      '"אנחנו נסדר ונתקן את הבית והוא יהיה נעים כמו קודם."',
      '"כל אחד חוזר לשגרה בקצב שלו."',
    ],
  },
];

export default function SC33_Communication({ navigation }) {
  const [activeTab, setActiveTab] = useState('leaving');
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // כמו בווב: כל סשן חדש מאפס בחירות
    (async () => {
      await remove('checkedPhrases');
      setCheckedItems({});
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Object.keys(checkedItems).length > 0) {
        await setString('checkedPhrases', JSON.stringify(checkedItems));
      }
    })();
  }, [checkedItems]);

  const handleCheck = (phrase, checked) => {
    setCheckedItems((prev) => ({ ...prev, [phrase]: checked }));
  };

  const currentTab = useMemo(() => {
    return tabs.find((t) => t.key === activeTab);
  }, [activeTab]);

  return (
    <AppLayout>
      <View style={styles.header}>
        <Text style={styles.h1}>מה אומרים עכשיו?</Text>
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tabBtn,
                isActive ? styles.tabActive : styles.tabInactive,
              ]}
            >
              <Text
                style={[
                  styles.tabLabel,
                  isActive ? styles.tabLabelActive : null,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{currentTab?.title}</Text>
        </View>

        {currentTab?.tip ? (
          <View style={styles.tip}>
            <Text style={styles.tipText}>{currentTab.tip}</Text>
          </View>
        ) : null}

        <View style={{ paddingHorizontal: 14, paddingBottom: 6 }}>
          {(currentTab?.phrases || []).map((phrase) => (
            <ChecklistItem
              key={phrase}
              text={phrase}
              checked={!!checkedItems[phrase]}
              onChange={(checked) => handleCheck(phrase, checked)}
            />
          ))}
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        {activeTab === 'leaving' ? (
          <Button title="מעבר להגענו" onPress={() => setActiveTab('arrived')} />
        ) : activeTab === 'arrived' ? (
          <Button title="מעבר למשבר" onPress={() => setActiveTab('crisis')} />
        ) : activeTab === 'crisis' ? (
          <Button title="מעבר לחוזרים" onPress={() => setActiveTab('returning')} />
        ) : (
          <Button
            title="סיימתי לבחור / למסך הסיכום"
            variant="outline"
            onPress={() => navigation.navigate('Dashboard')}
          />
        )}
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 6 },
  h1: { color: '#E6EEF8', fontSize: 22, fontWeight: '900' },
  tabRow: {
    flexDirection: 'row-reverse',
    gap: 8,
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 14, borderWidth: 1 },
  tabActive: { backgroundColor: '#4F8CFF', borderColor: '#4F8CFF' },
  tabInactive: { backgroundColor: '#101824', borderColor: '#233043' },
  tabLabel: { fontSize: 12, fontWeight: '800', color: '#AFC0D6' },
  tabLabelActive: { color: '#06101F' },
  card: {
    backgroundColor: '#101824',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#233043',
    overflow: 'hidden',
  },
  cardHeader: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#233043' },
  cardTitle: { color: '#E6EEF8', fontSize: 18, fontWeight: '900', textAlign: 'right' },
  tip: {
    margin: 14,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#1D1A10',
    borderWidth: 1,
    borderColor: '#3A2F17',
  },
  tipText: { color: '#E6EEF8', fontWeight: '700', textAlign: 'right' },
});
