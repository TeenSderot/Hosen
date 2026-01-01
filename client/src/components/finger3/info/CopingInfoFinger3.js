import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import InfoCard from './InfoCard';
import { useNavigation } from '@react-navigation/native';

const CopingInfoFinger3 = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center',}}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Main info card */}
        <InfoCard 
          title="התמודדות היא פעולה אקטיבית" 
          accentColor="green" 
          delay={0}
          defaultOpen={true}
        >
          <View style={styles.cardContent}>
            <Text>
התמודדות אינה מצב פסיבי, אלא מאמץ מכוון (מחשבתי והתנהגותי) שמטרתו להשיג מחדש שיווי משקל, להקל על הגוף ולאפשר גיוס כוחות למצבים חדשים.            </Text>
            
          </View>
        </InfoCard>

        <InfoCard 
          title="מלכודת ההרגלים המוכרים"
          accentColor="orange" 
          delay={100}
        >
          <View style={styles.cardContent}>
            <Text>
רובנו חוזרים לשיטות התמודדות ישנות (כמו שינה, אוכל או צפייה בטלוויזיה). הבעיה היא ששיטות אלו לא תמיד יעילות במצבים חדשים, קיצוניים או מתמשכים. בזמן משבר, ייתכן שהמשאבים המוכרים לנו לא יהיו זמינים, ולכן עלינו להיות יצירתיים וגמישים.            </Text>
            
          </View>
        </InfoCard>

        <InfoCard 
          title={"\"ארגז הכלים\" – מגוון וזמינות כדי לשמור על חוסן, עלינו לפתח ארגז כלים\" עשיר ומגוון"}
          accentColor="yellow" 
          delay={200}
        >
          <View style={styles.cardContent}>
            <Text>
עושר: ריבוי של שיטות התמודדות שונות.
            </Text>
            <Text>
זמינות: כלים שניתן להפעיל בכל מצב ובכל זמן.
            </Text>
            <Text style={styles.boldText}>
תחזוקה: חובה "למלא" את הארגז באופן שוטף ולא לחכות לרגע המשבר כדי לחפש כלים חדשים.
            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="חוק שימור המשאבים: קיים קשר ישיר בין המשאבים שיש לנו לבין היכולת שלנו להשיג חדשים"
          accentColor="blue" 
          delay={300}
        >
          <View style={styles.cardContent}>
            <Text>
החזקים מתחזקים: מי שיש לו משאבים, קל לו יותר לגייס משאבים נוספים.            </Text>
            <Text style={styles.boldText}>
סכנת ההתרוקנות: מי שנותר ללא משאבים הופך לפגיע מאוד, מתקשה להשתקם ונוטה לבזבז את מעט הכוחות שנשארו לו בצורה לא נבונה.            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="השורה התחתונה" 
          accentColor="lime" 
          delay={400}
        >
          <View style={styles.cardContent}>
            <Text>
אסור להגיע למצב של התרוקנות מוחלטת. ניהול נכון של לחץ דורש היערכות מוקדמת ושמירה קפדנית על רזרבות של כוחות וכלים.            </Text>
            
          </View>
        </InfoCard>
      </View>
              <TouchableOpacity
                onPress={()=>navigation.navigate("Finger3")}
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

export default CopingInfoFinger3;
