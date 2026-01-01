import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import InfoCard from './InfoCard';
import { useNavigation } from '@react-navigation/native';

const CopingInfoFinger1 = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center',}}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Main info card */}
        <InfoCard 
          title={"חשיבות הזיהוי (\"הכרת האויב\")"} 
          accentColor="green" 
          delay={0}
          defaultOpen={true}
        >
          <View style={styles.cardContent}>
            
            <Text>
זיהוי גורמי הלחץ הוא הצעד הראשון בהיערכות נכונה. הוא מאפשר לנו להבין אילו משאבים נחוצים לנו ומתי עלינו לוותר על משימות מסוימות כדי להתפנות להתמודדות העיקרית.            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="סכנת הלחץ השגרתי (השקוף) "
          accentColor="orange" 
          delay={100}
        >
          <View style={styles.cardContent}>
           
            <Text>
 רוב האנשים מתמקדים באירועים קיצוניים (מחלה, פיטורין, מלחמה), אך מתעלמים מהלחצים היומיומיים. לחצים אלו (עומס בעבודה, גידול ילדים, דאגות כלכליות, ואפילו אירועים חיוביים כמו חתונה) הם כרוניים ומצטברים. הם גוזלים משאבים באופן עקבי ועלולים להוביל לשחיקה מבלי שנשים לב.            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="תפקיד האישיות "
          accentColor="yellow" 
          delay={200}
        >
          <View style={styles.cardContent}>
          
            <Text>
האופן שבו אדם חווה לחץ תלוי גם בתכונותיו. תכונות כמו אופטימיות וגמישות מסייעות במיתון הלחץ, בעוד שצורך בשליטה ותחרותיות עלולים להגביר אותו.            </Text>
            
          </View>
        </InfoCard>

        <InfoCard 
          title="מאזן הלחץ (דרישות מול משאבים): לחץ מוגדר כפער בין הדרישות המופעלות עלינו לבין המשאבים העומדים לרשותנו." 
          accentColor="blue" 
          delay={300}
        >
          <View style={styles.cardContent}>
            
            <Text style={styles.boldText}>
בשגרה: לרוב יש לנו משאבים מספיקים, אך הצטברות של "דרישות קטנות" מתישה אותנו.            </Text>
            <Text style={styles.boldText}>
בחירום: כשמתווספים אירועים חריגים (כמו מגפת הקורונה או מצב ביטחוני), המאזניים מופרים והעומס הופך לבלתי נסבל.            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="השורה התחתונה - ניהול משאבים "
          accentColor="lime" 
          delay={400}
        >
          <View style={styles.cardContent}>
            
            <View style={styles.flexCenter}>
              <View style={styles.icon}>⚖️</View>
            </View>
            <Text style={styles.centerText}>
כדי לשמור על איזון, עלינו למנוע הצטברות של דרישות מיותרות. במצבי לחץ חריגים, חיוני לבחון את רשימת המטלות ולבטל דרישות שאינן חיוניות כדי לשחרר משאבים להתמודדות עם העיקר.            </Text>
          </View>
        </InfoCard>
      </View>
              <TouchableOpacity
                onPress={()=>navigation.navigate("Finger1")}
                style={styles.nextButton}
              >
                <Text style={styles.nextButtonText}>המשך</Text>
              </TouchableOpacity>
           
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   footer: {
     
      padding: 24,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      justifyContent:'center'
    },
    nextButton: {
      backgroundColor:"#84C7DA",
      paddingVertical: 16,
      borderRadius: 999,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
      width:"80%"
    },
    nextButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Rubik-Bold',
    },
  container: {
    flex: 1,
    
    backgroundColor: '#F8F8F8',
  },
  mainContent: {
    padding: 20,
    width: '100%',
    
  },
  cardContent: {
    marginBottom: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  icon: {
    fontSize: 50,
  },
  centerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8A8A8A',
  },
});

export default CopingInfoFinger1;
