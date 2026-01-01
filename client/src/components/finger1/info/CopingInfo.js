import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import InfoCard from './InfoCard';
import { useNavigation } from '@react-navigation/native';

const CopingInfo = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center',
    alignItems: 'center',}}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Main info card */}
        <InfoCard 
          title="התמודדות - מה זה אומר?" 
          accentColor="green" 
          delay={0}
          defaultOpen={true}
        >
          <View style={styles.cardContent}>
            <Text>
              האדם המתמודד עם לחצים אינו פסיבי. הוא נוקט בצעדים ומתאמץ. התמודדות מייצגת מאמצים קוגניטיביים והתנהגותיים שנוקט היחיד על מנת לטפל בדרישות המאיימות עליו או מעמיסות על משאביו.
            </Text>
            <Text>
              מאמצים אלו נועדו להקל עליו, לפצות אותו, לאפשר לו מנוחה ולהשיג מחדש שיווי משקל. התמודדות מפתחת יכולות המובילות לשינוי סביבתו או היחס אליה, באופן שמפחית את האיום ומאפשר מציאת משאבים חילופיים.
            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="ארגז הכלים שלך" 
          accentColor="orange" 
          delay={100}
        >
          <View style={styles.cardContent}>
            <Text>
              לכל אדם יש מיומנויות התמודדות שמצא כיעילות עבורו. בכל עת שעליו להתמודד הוא שב וחוזר אליהן. רוב האנשים טוענים שהם מתמודדים היטב. אבל בחינה מדוקדקת מראה שלא כך הוא.
            </Text>
            <Text>
              לא תמיד השיטות המוכרות יעילות או מספקות. בטח לא במצבים חדשים או לאורך זמן. למשל בן אדם שמתמודד על ידי שינה, אכילה, חברים וטלוויזיה - ימצא עצמו בזמן פינוי בלי כל המשאבים הנל. ומה יעשה אז?
            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="להיות מוכן תמיד" 
          accentColor="yellow" 
          delay={200}
        >
          <View style={styles.cardContent}>
            <Text>
              בשגרה יש לרוב מרווחים בין הבעיות שמאפשרים התאוששות וגיוס משאבים. ומה כאשר אין פסק זמן?
            </Text>
            <Text>
              לכן, כדי להתמודד ביעילות, צריך בן אדם לגבש "ארגז כלים" עשיר, מגוון וזמין שיעמוד לרשותו בכל עת. עליו להכיר ולדעת להפעיל את כל הכלים שבו. ועליו למלא את הארגז כל הזמן - לא להגיע למצב שהארגז ריק.
            </Text>
            <Text style={styles.boldText}>
              צריך להיות מוכן תמיד. לא תמיד אירועי לחץ מודיעים מראש על הגעתם.
            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="חוק שימור המשאבים" 
          accentColor="blue" 
          delay={300}
        >
          <View style={styles.cardContent}>
            <Text>
              חוק שימור המשאבים אומר שמי שיש לו משאבים יכול לגייס עוד, ומי שאין לו משאבים הוא פגיע ויהיה לו קשה יותר לגייס חדשים, ואת המעט שיש לו יבזבז בצורה לא נבונה.
            </Text>
            <Text style={styles.boldText}>
              המסקנה אסור להישאר בלי משאבים. כאשר אין משאבים קשה מאוד לאסוף חדשים.
            </Text>
          </View>
        </InfoCard>

        <InfoCard 
          title="בואו נבחן - דרישות מול משאבים" 
          accentColor="lime" 
          delay={400}
        >
          <View style={styles.cardContent}>
            <Text>
              כל אחד מאיתנו מתמודד עם מערכת של דרישות מול משאבים. חשוב לבדוק את האיזון ביניהם ולוודא שהמשאבים שלנו מספיקים להתמודד עם הדרישות.
            </Text>
            <View style={styles.flexCenter}>
              <View style={styles.icon}>⚖️</View>
            </View>
            <Text style={styles.centerText}>
              תמונה של מאזניים - דרישות מול משאבים
            </Text>
          </View>
        </InfoCard>
      </View>
              <TouchableOpacity
                onPress={()=>navigation.navigate("StressDefinitionScreen")}
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

export default CopingInfo;
