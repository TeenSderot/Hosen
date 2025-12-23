import { useNavigation } from "@react-navigation/native"
import { Image, TouchableOpacity, View } from "react-native"

const BottomBar =()=>{
    const navigation = useNavigation()

    return (
         <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate("toolbox")}
            >
              <Image
                source={require("../../../assets/toolbox.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tab}
              onPress={() => navigation.navigate("Hand")}
            >
              <Image
                source={require("../../../assets/home.png")}
                style={styles.icon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
              <Image
                source={require("../../../assets/divrot.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
    )
}

export default BottomBar