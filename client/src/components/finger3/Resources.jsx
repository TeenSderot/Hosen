import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { Bell } from 'lucide-react-native';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';


const resources = [
  { id: 1, text: 'רכב פרטי / ניידות', color: '#71A674' },
  { id: 2, text: 'הכנסה שנכנסת (גם אם חלקית)', color: '#D1E38F' },
  { id: 3, text: 'בריאות פיזית סבירה (שלי ושל המשפחה)', color: '#FD954E' },
  { id: 4, text: 'תקווה / אמונה (בטוב, באלוהים, בעצמי)', color: '#84C7DA' },
  { id: 5, text: 'זוגיות מתפקדת / שותף לדרך', color: '#F9F081' },
  { id: 6, text: 'חברים זמינים (גם בטלפון)', color: '#71A674' },
  { id: 7, text: 'מכשירים נחוצים (לפטופ, סמארטפון תקין)', color: '#D1E38F' },
];

export default function ResourcesTab() {
  const [checkedItems, setCheckedItems] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    'Rubik-Regular': Rubik_400Regular,
    'Rubik-Medium': Rubik_500Medium,
    'Rubik-Bold': Rubik_700Bold,
  });

 
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const toggleItem = (id) => {
    const newCheckedItems = {
      ...checkedItems,
      [id]: !checkedItems[id],
    };
    setCheckedItems(newCheckedItems);

    const checkedCount = Object.values(newCheckedItems).filter(Boolean).length;
    if (checkedCount > 0) {
      setShowFeedback(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.notificationButton}>
          <Bell size={24} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.rtlWrapper}>
          <Text style={styles.title}>המשאבים ה"שקופים" שלך</Text>

          <Text style={styles.description}>
            לפעמים אנחנו שוכחים את מה שכן יש לנו. אלו המשאבים הבסיסיים, ה"שקופים",
            שאם לא היו לנו – המצב היה קשה הרבה יותר.
          </Text>

          <Text style={styles.subtitle}>
            סמן כל משאב שזמין לך כרגע (גם אם באופן חלקי):
          </Text>
        </View>
        <View style={styles.checklistContainer}>
          {resources.map((resource, index) => (
            <TouchableOpacity
              key={resource.id}
              style={styles.checkItem}
              onPress={() => toggleItem(resource.id)}
              activeOpacity={0.7}>
              <View style={styles.checkItemContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.checkItemText}>{resource.text}</Text>
                </View>
                <View
                  style={[
                    styles.checkbox,
                    checkedItems[resource.id] && styles.checkboxChecked,
                    checkedItems[resource.id] && { backgroundColor: resource.color },
                  ]}>
                  {checkedItems[resource.id] && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </View>
              <View
                style={[
                  styles.colorAccent,
                  { backgroundColor: resource.color },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackText}>
              כל הכבוד. אלו משקולות זהב שנותנות קונטרה ללחץ, אבל זה עדיין לא מספיק.
            </Text>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FD954E',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Rubik-Bold',
    color: '#3D3D3D',
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 40,
    textAlign:'left'
    
  },
    rtlWrapper: {
    width: '100%',
    alignItems: 'flex-end',      // דוחף את הילדים לימין
    writingDirection: 'rtl',     // קובע כיוון כתיבה אמיתי
  },

  description: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: '#5D5D5D',
    textAlign: 'right',
    lineHeight: 24,
    marginBottom: 25,
    
    textAlign:'left'
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Rubik-Medium',
    color: '#3D3D3D',
    textAlign: 'right',
    marginBottom: 20,
    lineHeight: 26,
    
    textAlign:'left'
  },
  checklistContainer: {
    gap: 16,
  },
  checkItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  checkItemContent: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  
  textContainer: {
    flex: 1,
  },
  checkItemText: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: '#3D3D3D',
    textAlign: 'right',
    lineHeight: 24,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: 'transparent',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  colorAccent: {
    height: 6,
    width: '100%',
  },
  feedbackContainer: {
    backgroundColor: '#71A674',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: '#FFFFFF',
    textAlign: 'right',
    lineHeight: 24,
  },
  spacer: {
    height: 40,
  },
});