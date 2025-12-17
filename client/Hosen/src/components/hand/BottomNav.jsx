import { View, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const HomeIcon = () => (
  <Svg width={34} height={34} viewBox="0 0 34 34">
    <Path
  d="M29.5093 11.3474L20.2301 3.92411C18.4168 2.47911 15.5834 2.46494 13.7843 3.90994L4.50511 11.3474C3.17344 12.4099 2.36594 14.5349 2.64928 16.2066L4.43428 26.8883C4.84511 29.2824 7.06928 31.1666 9.49178 31.1666H24.5084C26.9026 31.1666 29.1693 29.2399 29.5801 26.8741L31.3651 16.1924C31.6201 14.5349 30.8126 12.4099 29.5093 11.3474ZM18.0626 25.4999C18.0626 26.0808 17.5809 26.5624 17.0001 26.5624C16.4193 26.5624 15.9376 26.0808 15.9376 25.4999V21.2499C15.9376 20.6691 16.4193 20.1874 17.0001 20.1874C17.5809 20.1874 18.0626 20.6691 18.0626 21.2499V25.4999Z"
  fill="#2E3131"
  stroke="#2E3131"
  strokeWidth={3.7}
/>
  </Svg>
);

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.btn}>
        <HomeIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 20,
  },
  btn: {
    transform: [{ scale: 1 }],
  },
});
