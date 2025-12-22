# משולש החוסן - React Native

אפליקציית React Native המציגה נתוני סקר חוסן לאומי בעברית.

## התקנה

```bash
# התקנת תלויות
npm install

# הרצה על iOS
npm run ios

# הרצה על Android
npm run android

# הרצה בדפדפן
npm run web
```

## דרישות

- Node.js 18+
- Expo CLI
- עבור iOS: macOS + Xcode
- עבור Android: Android Studio

## מבנה הפרויקט

```
react-native-app/
├── App.js                      # קומפוננטת ראשית
├── components/
│   ├── ResilienceCard.js      # כרטיס חוסן עם גרף עוגה
│   ├── InsightBox.js          # תיבת תובנה
│   └── PieChart.js            # גרף עוגה מותאם אישית
├── package.json
├── app.json
└── babel.config.js
```

## תכונות

- ✅ תמיכה מלאה בעברית (RTL)
- ✅ גרפי עוגה אינטראקטיביים
- ✅ עיצוב רספונסיבי
- ✅ אנימציות חלקות
- ✅ תמיכה ב-iOS, Android ו-Web

## טכנולוגיות

- React Native
- Expo
- react-native-svg (לגרפים)
- JavaScript (ES6+)

## התאמה אישית

כל הצבעים והסטיילים מוגדרים inline בקומפוננטות ונוחים לשינוי.
