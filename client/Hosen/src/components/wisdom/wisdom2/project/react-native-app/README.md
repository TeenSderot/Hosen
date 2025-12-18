# משולש החוסן - Resilience Triangle

אפליקציית React Native למעקב אחר אינדיקטורים מוקדמים למצוקה בקרב עובדים.

## התקנה

```bash
npm install
```

## הרצה

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web
```bash
npm run web
```

## מבנה הפרויקט

```
react-native-app/
├── App.js                 # קומפוננטה ראשית
├── index.js              # נקודת כניסה
├── constants.js          # צבעים וקבועים
├── components/           # קומפוננטות
│   ├── ResilienceCard.js
│   └── InsightBox.js
└── screens/             # מסכים
    └── HomeScreen.js
```

## תכונות

- תמיכה מלאה בעברית RTL
- אנימציות חלקות
- תרשימים אינטראקטיביים
- עיצוב רספונסיבי
- תמיכה ב-iOS, Android ו-Web
