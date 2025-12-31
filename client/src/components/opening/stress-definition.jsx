import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Animated,
  Dimensions,
  I18nManager,
} from 'react-native';

I18nManager.forceRTL(true);

const { width } = Dimensions.get('window');

const StressDefinitionScreen = () => {
  const navigation = useNavigation()
  const fadeAnims = {
    image: useRef(new Animated.Value(0)).current,
    title: useRef(new Animated.Value(0)).current,
    paragraph: useRef(new Animated.Value(0)).current,
    quote: useRef(new Animated.Value(0)).current,
    button: useRef(new Animated.Value(0)).current,
  };

  const translateYAnims = {
    title: useRef(new Animated.Value(20)).current,
    paragraph: useRef(new Animated.Value(20)).current,
    quote: useRef(new Animated.Value(20)).current,
    button: useRef(new Animated.Value(20)).current,
  };

  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    const animations = [
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnims.image, {
          toValue: 1,
          duration: 400,
          delay: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnims.title, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnims.title, {
          toValue: 0,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnims.paragraph, {
          toValue: 1,
          duration: 500,
          delay: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnims.paragraph, {
          toValue: 0,
          duration: 500,
          delay: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnims.quote, {
          toValue: 1,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnims.quote, {
          toValue: 0,
          duration: 500,
          delay: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnims.button, {
          toValue: 1,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnims.button, {
          toValue: 0,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }),
      ]),
    ];

    Animated.sequence(animations).start();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          {/* Illustration Card */}
          <Animated.View
            style={[
              styles.imageCard,
              {
                opacity: fadeAnims.image,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>⚖️</Text>
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.View
            style={{
              opacity: fadeAnims.title,
              transform: [{ translateY: translateYAnims.title }],
            }}
          >
            <Text style={styles.title}>הגדרת המושג לחץ</Text>
          </Animated.View>

          {/* Main Paragraph */}
          <Animated.View
            style={{
              opacity: fadeAnims.paragraph,
              transform: [{ translateY: translateYAnims.paragraph }],
            }}
          >
            <Text style={styles.paragraph}>
              לחץ נובע מהערכה אישית שקיים פער בין הדרישות המוטלות עליך לבין המשאבים
              והכוחות שיש לך כדי להתמודד איתן.{'\n\n'}
              הדרך לשיפור היא הקטנת הפער הזה באמצעות ניהול נבון של הכוחות הקיימים,
              והוספה מתמדת של משאבים חדשים שיהיו זמינים לך גם מול אתגרים לא צפויים.
            </Text>
          </Animated.View>

          {/* Blockquote Card */}
          <Animated.View
            style={[
              styles.blockquoteCard,
              {
                opacity: fadeAnims.quote,
                transform: [{ translateY: translateYAnims.quote }],
              },
            ]}
          >
            <Text style={styles.blockquoteText}>
              השקט מגיע כשהמאזניים מאוזנים:{'\n'}
              אני מנהל את הכוחות שלי בתבונה, ודואג תמיד להוסיף משאבים חדשים מול כל
              אתגר.
            </Text>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <Animated.View
        style={[
          styles.footer,
          {
            opacity: fadeAnims.button,
            transform: [{ translateY: translateYAnims.button }],
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => {
            navigation.navigate("Dashboard_Dashborad")
          }}
        >
          <Text style={styles.buttonText}>המשך</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    maxWidth: 512,
    width: '100%',
    alignSelf: 'center',
  },
  imageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#A8DBDE',
    padding: 32,
    width: 200,
    aspectRatio: 1,
    alignSelf: 'center',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 110,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Rubik-Bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 24,
    writingDirection: 'rtl',
  },
  paragraph: {
    fontSize: 17,
    fontFamily: 'Rubik-Regular',
    lineHeight: 26,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 28,
    writingDirection: 'rtl',
    paddingHorizontal: 8,
  },
  blockquoteCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    borderRightWidth: 5,
    borderRightColor: '#A8DBDE',
    padding: 24,
    marginTop: 8,
    marginHorizontal: 4,
  },
  blockquoteText: {
    fontSize: 17,
    fontFamily: 'Rubik-Medium',
    color: '#1a1a1a',
    lineHeight: 26,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#A8DBDE',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 512,
    alignSelf: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 19,
    fontFamily: 'Rubik-SemiBold',
    color: '#1a1a1a',
  },
});

export default StressDefinitionScreen;
