import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import MoodSelector from "./MoodSelector";
import HandIllustration from "./HandIllustration";
// import BottomNav from "./BottomNav";
import { Input } from "./Input";
import { COLORS } from "./COLORS";

export default function HomeScreen({ route }) {
  const [journal, setJournal] = useState("");
 const { userName } = route.params;
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../../assets/lotus.png")} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          היי, ${userName}{"\n"}איך היום שלך בינתיים?
        </Text>

        <Input
          value={journal}
          onChangeText={setJournal}
          placeholder="כתוב כאן..."
        />

        <MoodSelector />

        <View style={styles.hand}>
          <HandIllustration />
        </View>
      </ScrollView>

      {/* <BottomNav /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: 20,
    marginTop: 40,
    alignItems: "flex-end",
  },
  logo: { width: 48, height: 48 },
  content: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "right",
    marginBottom: 24,
  },
  hand: {
    alignItems: "center",
    marginTop: 20,
  },
});
