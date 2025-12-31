# Parent Oxygen (React Native • JavaScript)

גרסת React Native (Expo) של הפרויקט המקורי.

## דרישות
- Node.js (מומלץ LTS)
- Expo Go על הטלפון (לבדיקה מהירה) או Android Studio/Simulator

## התקנה והרצה
```bash
npm install
npm start
```

לאנדרואיד:
```bash
npm run android
```

## מבנה הפרויקט
- `App.js` – ניווט (React Navigation Stack)
- `src/screens/*` – כל המסכים (Index / WhoSaves / Recharge / SelfCare / Summary)
- `src/components/ui/*` – רכיבי UI בסיסיים (Button, ChecklistItem)
- `src/components/ScreenLayout.js` – פריסה אחידה (רקע + כרטיס מרכזי)
- `src/theme/colors.js` – צבעים

## שמירת נתונים
הצ'ק ליסט נשמר ב-AsyncStorage תחת המפתח:
- `selfcare-checklist`

## הערות
- הפרויקט כתוב ב-JavaScript (לא TSX).
- הוחלפו רכיבי Web (Tailwind / shadcn / react-router) ברכיבי React Native + React Navigation.
