import { Image, StyleSheet, TouchableOpacity } from "react-native"

export default function Lotus ({navigateTo}) {
    return (
      <TouchableOpacity onPress={() => navigateTo("Breathing")}>
                <Image source={require("../../../assets/lotus.png")} style={styles.logo} /></TouchableOpacity>
      )
}
const styles = StyleSheet.create({

  logo: { width: 50, height: 48 },
})
