import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';

const resources = [
  { id: 1, text: 'רכב פרטי / ניידות', color: '#71A674' },
  { id: 2, text: 'הכנסה שנכנסת (גם אם חלקית)', color: '#D1E38F' },
  { id: 3, text: 'בריאות פיזית סבירה (שלי ושל המשפחה)', color: '#FD954E' },
  { id: 4, text: 'תקווה / אמונה (בטוב, באלוהים, בעצמי)', color: '#84C7DA' },
];

export default function ResourcesTab() {
  const [checked, setChecked] = useState({});

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  });

  if (!fontsLoaded) return null;

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
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
      {resources.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => toggle(item.id)}
        >
          {/* פס צבע מימין */}
          <View
            style={[
              styles.colorBar,
              { backgroundColor: item.color },
            ]}
          />

          <View style={styles.content}>
            <View style={styles.textWrapper}>
              <Text style={styles.text}>{item.text}</Text>
            </View>

            <View
              style={[
                styles.checkbox,
                checked[item.id] && {
                  backgroundColor: item.color,
                  borderColor: 'transparent',
                },
              ]}
            >
              {checked[item.id] && <Text style={styles.check}>✓</Text>}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
  },

  colorBar: {
    width: 8,
  },

  content: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },

  textWrapper: {
    textAlign:'right',
    alignItems:'flex-start',
  },

  text: {
    fontSize: 16,
    fontFamily: 'Rubik_400Regular',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  check: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
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
});






