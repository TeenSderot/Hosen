import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MoodSelector from "./MoodSelector";
import HandIllustration from "./HandIllustration";
// import BottomNav from "./BottomNav";
import { Input } from "./Input";
import { COLORS } from "./COLORS";
import Lotus from "../ui/Lotus";

export default function HomeScreen() {
  //const [journal, setJournal] = useState("");
  const [full_name, setFullName] = useState("");
  useEffect(()=>{
    const fetchUserName = async () => {
        setFullName(await SecureStore.getItemAsync("full_name")||"אורח")
    }
    fetchUserName()
  },[])

  return (
    <View style={styles.root}>
      {/* Header */}
      

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          היי, {full_name || ""} טוב לראות אותך.{"\n"}איך היום שלך בינתיים?
        </Text>

        {/* <Input
          value={journal}
          onChangeText={setJournal}
          placeholder="כתוב כאן..."
        /> */}

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
    alignItems: "center",
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-between",

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
