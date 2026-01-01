import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Brain, Heart } from 'lucide-react-native';

export default function Screen1({ onNext }) {
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: 'white' }} >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>חוק שימור המשאבים</Text>

        <View style={styles.imageWrapper}>
          <Image
            source={require('../../../assets/scale.png')} // path מקומי
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            בחיים, אנחנו כל הזמן מהלכים על חבל דק.
          </Text>
          <Text style={styles.cardText}>
            תיאוריית "שימור המשאבים" מלמדת אותנו
            שכדי לשרוד ולשגשג, אנחנו חייבים לשמור על
            איזון בין שני כוחות:
          </Text>
        </View>

        <View style={[styles.card, styles.orangeCard]}>
          <View style={styles.row}>
            <View style={styles.iconWrapperOrange}>
              <Brain size={24} color="#FD954E" />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.cardTitle}>כף הדרישות</Text>
              <Text style={styles.cardTextSmall}>
                כל מה שלוקח מאיתנו אנרגיה - לחצים, משימות, דאגות.
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, styles.greenCard]}>
          <View style={styles.row}>
            <View style={styles.iconWrapperGreen}>
              <Heart size={24} color="#71A674" />
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.cardTitle}>כף המשאבים</Text>
              <Text style={styles.cardTextSmall}>
                כל מה שטוען אותנו באנרגיה - כלים, תמיכה, נכסים, כוחות פנימיים.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>נבחן את המאזניים שלך</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    flexDirection: 'column',
    writingDirection: 'rtl',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    color: '#1F2937',
    marginVertical: 16,
  },
  imageWrapper: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardTextSmall: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconWrapperOrange: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FD954E33',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperGreen: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#71A67433',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  orangeCard: {
    borderRightWidth: 4,
    borderRightColor: '#FD954E',
  },
  greenCard: {
    borderRightWidth: 4,
    borderRightColor: '#71A674',
  },
  button: {
    backgroundColor: '#FD954E',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
