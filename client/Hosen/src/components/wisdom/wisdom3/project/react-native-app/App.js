import React from 'react';
import { ScrollView, View, Text, StatusBar, I18nManager } from 'react-native';
import { ResilienceCard } from './components/ResilienceCard';
import { InsightBox } from './components/InsightBox';

// Enable RTL for Hebrew
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FEFDF8' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <View style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Decorative Elements */}
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 128,
            height: 128,
            backgroundColor: 'rgba(149, 175, 115, 0.1)',
            borderRadius: 128,
          }} />
          <View style={{
            position: 'absolute',
            top: 80,
            right: 0,
            width: 160,
            height: 160,
            backgroundColor: 'rgba(117, 184, 210, 0.1)',
            borderRadius: 160,
          }} />

          <View style={{ paddingHorizontal: 16, paddingTop: 32, paddingBottom: 24 }}>
            {/* Badge */}
            <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: '#D7F7F8',
                borderWidth: 2,
                borderColor: '#A8DBDE',
              }}>
                <View style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor: '#A8DBDE',
                }} />
                <Text style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#1E4D3D',
                }}>
                  על מה אנחנו נשענים?
                </Text>
              </View>
            </View>

            {/* Main Title */}
            <Text style={{
              fontSize: 28,
              fontWeight: '700',
              textAlign: 'center',
              color: '#1E4D3D',
              marginBottom: 16,
              lineHeight: 36,
            }}>
              משולש החוסן:{'\n'}
              <Text style={{ color: '#A8DBDE' }}>חוזרים אל הבסיס</Text>
            </Text>

            {/* Subtitle */}
            <Text style={{
              textAlign: 'center',
              color: '#3D6B5C',
              fontSize: 14,
              lineHeight: 22,
              marginBottom: 32,
              paddingHorizontal: 8,
            }}>
              כשבחוץ סוער, אנחנו מתכנסים פנימה. הנתונים מוכיחים כי מקור הכוח האמיתי שלנו אינו נמצא במשאבים חיצוניים או ממשלתיים, אלא בתוך הבית פנימה. אלו הם שלושת העוגנים שמחזיקים אותנו מעל המים:
            </Text>
          </View>
        </View>

        {/* Cards Section */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <View style={{ gap: 16 }}>
            {/* Family Card */}
            <ResilienceCard
              variant="behavior"
              title="השבט המשפחתי"
              percentage={86}
              subtitle="נעזרו במשפחה (71% רבה + 15% בינונית)"
              description="התרופה היעילה ביותר ללחץ. לא פסיכולוגים ולא כדורים – אלא הידיעה שיש לנו 'שבט' ששומר עלינו. המשפחה המורחבת והגרעינית היא רשת הביטחון הראשונה והחזקה ביותר."
            />

            {/* Partnership Card */}
            <ResilienceCard
              variant="emotional"
              title="הברית הזוגית"
              percentage={76}
              subtitle="נשענו על בן/בת הזוג (64% רבה + 12% בינונית)"
              description="שותפות גורל. הנתון הזה (מהגבוהים שנמדדו) מראה שברגעי האמת, הזוגיות היא המשאב הכי זמין ומשמעותי. היכולת להרגיש 'מובן' על ידי הפרטנר היא קריטית להתאוששות."
            />

            {/* Routine Card */}
            <ResilienceCard
              variant="cognitive"
              title="כוחה המרפא של השגרה"
              percentage={71}
              subtitle="נעזרו בחזרה לשגרה (54% רבה + 17% בינונית)"
              description="העשייה היא התרופה לחרדה. החזרה לפעולות הפשוטות – עבודה, לימודים, סידורים – היא זו שמחזירה לנו את תחושת השליטה והמסוגלות שאיבדנו."
            />
          </View>

          {/* Insight Box */}
          <InsightBox>
            <Text style={{ textAlign: 'center', color: '#1E4D3D', lineHeight: 22 }}>
              שימו לב לפער העצום: בעוד רק 38% נותנים אמון במדינה, 86% שואבים כוח מהמשפחה.{'\n'}
              <Text style={{ fontWeight: '700' }}>
                המסקנה: החוסן שלנו הוא מקומי, אישי וביתי.
              </Text>
            </Text>
          </InsightBox>

          {/* Footer */}
          <View style={{ marginTop: 32, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{
                width: 6,
                height: 6,
                backgroundColor: 'rgba(149, 175, 115, 0.5)',
                borderRadius: 6,
              }} />
              <Text style={{
                fontSize: 12,
                color: '#6B8575',
              }}>
                מבוסס על נתוני סקר חוסן לאומי
              </Text>
              <View style={{
                width: 6,
                height: 6,
                backgroundColor: 'rgba(149, 175, 115, 0.5)',
                borderRadius: 6,
              }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
