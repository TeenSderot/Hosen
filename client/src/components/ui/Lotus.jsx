import { Image, StyleSheet, TouchableOpacity } from "react-native"

export default function Lotus () {
    return (
                <Image source={require("../../../assets/lotus.png")} style={styles.logo} />
      )
}
const styles = StyleSheet.create({

  logo: { width: 48, height: 48 },
})
