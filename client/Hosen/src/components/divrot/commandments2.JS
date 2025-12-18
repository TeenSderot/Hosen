import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// המערך Commandments כמו שהצגת
const commandments = [
  {
    id: 1,
    title: "הערכות מוקדמת כבסיס לחוסן",
    description: "היכולת להתמודד עם משבר נקבעת עוד לפני שהוא מתרחש. יש לנצל תקופות רגיעה ללמידה ותרגול כלים, כי בחירום פועלים על בסיס הכנה מוקדמת בלבד.",
    color: "notebook-green",
  },
  {
    id: 2,
    title: "זיהוי והכרת גורמי הלחץ",
    description: "מיפוי מראש של לחצי שגרה (עבודה, כלכלה) ולחצי חירום מאפשר לנהל משאבים בתבונה ולמנוע קריסה פתאומית.",
    color: "notebook-lime",
  },
  {
    id: 3,
    title: "בניית ארגז כלים מגוון",
    description: "גיבוש מאגר שיטות הרגעה והתמודדות שיהיו זמינות גם כשהתנאים משתנים (כמו בזמן פינוי מהבית).",
    color: "notebook-orange",
  },
  {
    id: 4,
    title: "יצירת שפה משפחתית אחידה",
    description: "אימוץ טרמינולוגיה משותפת המאפשרת הערכת מצב מהירה ותיאום ציפיות מדויק בין ההורים לילדים בזמן אמת.",
    color: "notebook-blue",
  },
  {
    id: 5,
    title: "ההורים כמודל ומשאב מרכזי",
    description: "האופן שבו ההורה מגדיר את המצב והדוגמה האישית שהוא מציג קובעים את רמת החוסן והרוגע של הילדים.",
    color: "notebook-yellow",
  },
  {
    id: 6,
    title: "זיהוי מוקדם של סימני לחץ",
    description: "הכרת התסמינים הגופניים והרגשיים של כל בן משפחה מאפשרת התערבות מהירה לפני שהמצב מחריף.",
    color: "notebook-green",
  },
  {
    id: 7,
    title: "מתן לגיטימציה לתגובות רגשיות",
    description: "הבנה שפחד או בלבול הם תגובה נורמלית למצב לא נורמלי. זה מפחית חרדה ומונע תחושת \"מחלה\".",
    color: "notebook-lime",
  },
  {
    id: 8,
    title: "שמירה על גלאים ושותפי סוד",
    description: "היעזרות במעגל תמיכה חיצוני (סבא, חברים) שיכולים לזהות שינויים במצבנו כשאנחנו עסוקים מדי בהישרדות.",
    color: "notebook-orange",
  },
  {
    id: 9,
    title: "חיזוק האמונה ביכולת ההתמודדות",
    description: "טיפוח תודעה משפחתית של מסוגלות. האמונה ש\"אנחנו יכולים לזה\" מכתיבה את הצלחת ההתמודדות בפועל.",
    color: "notebook-blue",
  },
  {
    id: 10,
    title: "הכנת תוכנית מגרה אופרטיבית",
    description: "הגדרת חלוקת תפקידים ברורה לחירום (מי עוזר למי), המאפשרת תפקוד יעיל \"על אוטומט\" גם תחת לחץ כבד.",
    color: "notebook-yellow",
  },
];

const CommandmentsList = () => {
  // פונקציה להציג כל מצווה
  const renderItem = ({ item }) => (
    <View style={[styles.commandmentItem, { backgroundColor: colorClasses[item.color]?.bg || '#f0f0f0' }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={commandments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const colorClasses = {
  "notebook-green": { bg: "#34D399" },
  "notebook-lime": { bg: "#A3E635" },
  "notebook-orange": { bg: "#FB923C" },
  "notebook-blue": { bg: "#3B82F6" },
  "notebook-yellow": { bg: "#FBBF24" },
};

const styles = StyleSheet.create({
  commandmentItem: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
});

export default CommandmentsList;
