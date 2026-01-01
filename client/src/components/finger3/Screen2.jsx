import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Screen2({ onNext, onBack }) {
  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: 'white' }}>
      <View style={styles.innerContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../../assets/scaletilt_right.png')} // תמונה מקומית
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>תמונת המצב שלך</Text>
          <Text style={styles.cardText}>
            נכון לעכשיו, כף הלחצים (שגרה + חירום) כבדה יותר מכף המשאבים הזמינים.
          </Text>

          <Text style={styles.cardSubtitle}>אבל הנה החדשות הטובות:</Text>
          <Text style={styles.cardText}>
            חוק שימור המשאבים אומר שאפשר לייצר משאבים חדשים.
          </Text>

          <Text style={styles.cardTextBold}>
            מי שיש לו ארגז כלים מלא - מוגן יותר.
          </Text>

          <Text style={styles.cardTextBold}>
            בפרק הבא נבנה לך "ארגז כלים" מותאם אישית כדי להחזיר את האיזון.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>← עבור לארגז הכלים שלי</Text>
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
    writingDirection: 'rtl', // RTL
  },
  imageWrapper: {
    marginBottom: 24,
    marginTop: 16,
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
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  cardTextBold: {
    fontSize: 16,
    color: '#1F2937',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
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
