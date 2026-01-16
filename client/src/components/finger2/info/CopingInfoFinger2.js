import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import InfoCard from './InfoCard';
import { useNavigation } from '@react-navigation/native';

const CopingInfoFinger2 = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center',}}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Main info card */}
        <InfoCard 
          title="מהות התגובה"
          accentColor="green" 
          delay={0}
          defaultOpen={true}
        >
          <View style={styles.cardContent}>
            <Text>
סימני לחץ הם צפויים, לגיטימיים ושכיחים. הם אינם מעידים על מחלת נפש או חולשה, אלא על פער בין הדרישות למשאבים. ככל שהלחץ ממושך ועוצמתי יותר (כמו באירועי ה-7 באוקטובר), אחוז האנשים שיחוו השלכות אלו עולה משמעותית.            </Text>
            
          </View>
        </InfoCard>

        <InfoCard 
          title="חשיבות הזיהוי המוקדם"
          accentColor="orange" 
          delay={100}
        >
          <View style={styles.cardContent}>
            <Text>
זיהוי הסימנים בראשיתם מאפשר טיפול קל ואפקטיבי. איחור בזיהוי עלול להפוך את ההתמודדות למורכבת ואת הטיפול לפחות יעיל.            </Text>
            
          </View>
        </InfoCard>

        <InfoCard 
          title="ארבעת המישורים של סימני הלחץ"
          accentColor="yellow" 
          delay={200}
        >
          <View style={styles.cardContent}>
            <Text>
גופני: עוררות מוגברת (דופק מהיר, רעד, הזעה, כאבי ראש ובטן, אי-שקט מוטורי).            </Text>
            <Text>
רגשי: תחושות כמו חרדה, אשמה, כעס, תסכול או בושה.
            </Text>
            <Text>
שכלי (קוגניטיבי): פגיעה בריכוז ובזיכרון, בלבול, חשיבה נוקשה ואיטיות.
            </Text>
            <Text>
התנהגותי: סף תסכול נמוך, מריבות, קשיי שינה, ושינויים בהרגלי אכילה.
            </Text>
            
          </View>
        </InfoCard>

        <InfoCard 
          title="מיתוס הביצועים תחת לחץ" 
          accentColor="blue" 
          delay={300}
        >
          <View style={styles.cardContent}>
            <Text>
בניגוד למחשבה שלחץ "מוציא מאיתנו את המיטב", המחקר מראה שלחץ פוגע בביצועים, במיוחד במשימות מורכבות או חדשות.            </Text>
           
          </View>
        </InfoCard>

        <InfoCard 
          title="דגשים חשובים לזיהוי ותמיכה" 
          accentColor="lime" 
          delay={400}
        >
          <View style={styles.cardContent}>
            <Text>
סימנים "חיוביים" מטעים: התנדבות יתר או עבודה ללא הפסקה עלולות להיות סימן ללחץ שמכלה משאבים. יש להציב לאנשים אלו גבולות כדי למנוע קריסה.
            </Text>
           
            <Text>
הורים הם משאב קריטי: הורים נוטים להזניח את עצמם, אך גם הם מושפעים מהלחץ. חשוב שהם (ואחרים עבורם) ינטרו את מצבם.            </Text>
               <Text >
ערבות הדדית: מומלץ ללמד קרובי משפחה או קולגות לזהות את סימני הלחץ האישיים שלנו כדי שיוכלו לסייע לנו בזמן.           
</Text>

          </View>
        </InfoCard>
       
      </View>
              <TouchableOpacity
                onPress={()=>navigation.navigate("Finger2")}
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

export default CopingInfoFinger2;
