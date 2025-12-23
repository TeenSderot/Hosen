import { Image, TouchableOpacity, View } from "react-native"
import Lotus from "./Lotus"
import { useNavigation } from "@react-navigation/native"

const TopBar = ()=>{
    const navigation = useNavigation()

    return (<View style={styles.topBar}>
            <TouchableOpacity onPress={() => console.log("Menu Pressed")}>
              <Image
                source={require("../../../assets/menu-dots.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Breathing")}>
              <Lotus />
            </TouchableOpacity>
          </View>)
}
export default TopBar
