# Wisdom of Crowds - React Native

אפליקציית React Native להערכת חוסן אישי ומשפחתי

## התקנה

```bash
npm install
```

## הפעלה

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web

# Development
npm start
```

## מבנה הפרויקט

```
react-native/
├── App.js                      # Entry point
├── app.json                    # Expo configuration
├── babel.config.js            # Babel configuration
├── package.json               # Dependencies
└── src/
    ├── pages/
    │   └── Index.js           # Main screen
    └── components/
        ├── ResilienceCard.js  # Card with pie chart
        └── InsightBox.js      # Insight summary box
```

## תכונות

- תמיכה מלאה ב-RTL (Right-to-Left) לעברית
- גרפים אנימציה עם react-native-svg
- עיצוב מודרני ונקי
- תמיכה ב-iOS, Android ו-Web
