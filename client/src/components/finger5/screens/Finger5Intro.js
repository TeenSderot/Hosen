import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../ui/Button";
import { COLORS } from "../theme/colors";

export default function Finger5Intro({ navigation }) {
  return (
    <View style={{height:'100%',justifyContent:'space-between'}}>
      <Image
        source={require("../assets/assets_airplane.png")}
        style={styles.img}
        resizeMode="cover"
      />

      <Text style={styles.title}>מי יציל את המציל?</Text>

      <Text style={styles.subtitle}>
        במטוס, כשיורדות מסכות החמצן, ההנחיה ברורה:
        <Text style={styles.highlight}> קודם ההורה חובש מסכה</Text>, ורק אז עוזר לילד.
      </Text>

      <Text style={styles.subtitle}>
        גם כאן – כדי שתוכלו להיות המגדלור של הילדים,
        <Text style={styles.warmBold}> אתם חייבים לנשום בעצמכם</Text>.
      </Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>ילדים צריכים הורה מתפקד, לא הורה מושלם.</Text>
      </View>
    <View style={{alignItems:'center'}}>
      <Button
        title="לקחת נשימה ולהמשיך"
        variant="calm"
        onPress={() => navigation.navigate("RechargeChecklist")}
        style={{width:'90%'}}
      />

      <View style={{ height: 10 }} />

      <Button
        title="רגע… מי יציל את המציל?"
        variant="warm"
        onPress={() => navigation.navigate("WhoSavesTheSavior")}
        style={{width:'90%'}}
      /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 170,
    height: 170,
    borderRadius: 18,
    alignSelf: "center",
    marginBottom: 16,
    marginTop:16
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 10,
    marginEnd:20,
    marginStart:20
  },
  highlight: {
    fontWeight: "800",
    color: COLORS.accent,
    
  },
  warmBold: {
    fontWeight: "800",
    color: COLORS.warm,
  },
  quoteBox: {
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 18,
     marginEnd:20,
    marginStart:20
  },
  quoteText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
});
