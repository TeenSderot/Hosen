import { UserSelections, SymptomCategory } from './types';



export const SCORING_CONFIG = {
  physical: [
    { label: "קושי לנשום", score: 25 },
    { label: "דפיקות לב חזקות", score: 15 },
    { label: "כאבי בטן או בחילה", score: 15 },
    { label: "רעידות בגוף", score: 10 },
    { label: "סחרחורת", score: 10 },
    { label: "עייפות כבדה", score: 10 },
    { label: "תחושת חום או קור בגוף", score: 10 },
    { label: "הזעה בידיים", score: 5 },
    { label: "כאב ראש", score: 5 },
    { label: "יובש בפה", score: 5 },
  ],

  emotional: [
    { label: "ייאוש", score: 25 },
    { label: "חוסר אונים", score: 20 },
    { label: "פחד פתאומי", score: 20 },
    { label: "פחד להשתגע", score: 20 },
    { label: "אשמה", score: 15 },
    { label: "מרגיש לבד", score: 15 },
    { label: "בושה", score: 15 },
    { label: "עצבים וכעס", score: 10 },
    { label: "תחושת עומס", score: 10 },
    { label: "רצון לבכות", score: 5 },
  ],

  cognitive: [
    { label: "חושב על הגרוע מכל", score: 20 },
    { label: "ריקנות", score: 20 },
    { label: "מרגיש מנותק", score: 10 },
    { label: "בלבול", score: 15 },
    { label: "המחשבות לא עוצרות", score: 10 },
    { label: "קושי להתרכז", score: 10 },
    { label: "קושי להחליט", score: 10 },
    { label: "פועל על אוטומט", score: 10 },
    { label: "שוכח דברים", score: 5 },
  ],

  behavioral: [
    { label: "לא יוצא מהבית", score: 20 },
    { label: "אין לי חשק לכלום", score: 20 },
    { label: "לא אוכל", score: 15 },
    { label: "לא ישן", score: 15 },
    { label: "ישן כל היום", score: 15 },
    { label: "התפרצויות זעם", score: 15 },
    { label: "נשאר בפיג׳מה", score: 10 },
    { label: "בוכה בצד", score: 10 },
    { label: "אוכל בלי הפסקה", score: 10 },
    { label: "לא מצליח לשבת", score: 10 },
    { label: "חייב להיות עסוק כל הזמן", score: 10 },
    { label: "שואל שוב ושוב כדי להירגע", score: 10 },
    { label: "בורח לטלפון", score: 5 },
    { label: "כוסס ציפורניים", score: 5 },
  ]
};

const getScoreForLabel = (category, label) => {
  const list = SCORING_CONFIG[category];
  const item = list.find(i => i.label === label);
  return item ? item.score : 0;
};

export const calculateStressScore = (selections) => {
  let totalScore = 0;

  (Object.keys(selections)).forEach(category => {
    selections[category].forEach(label => {
      if (label !== "שום דבר") {
        totalScore += getScoreForLabel(category, label);
      }
    });
  });

  return Math.min(totalScore, 100);
};
