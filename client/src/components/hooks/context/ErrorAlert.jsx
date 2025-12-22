import { useEffect, useRef } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useError } from "./ErrorContext"

const ErrorAlert = () => {
  const { context_error, setContextError } = useError()
  const heightAnim = useRef(new Animated.Value(0)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: context_error ? 60 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: context_error ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start()
  }, [context_error])

  if (!context_error) return null

  const bgColor =
    context_error.severity === "error"
      ? "#F87171"
      : context_error.severity === "warning"
      ? "#FBBF24"
      : context_error.severity === "success"
      ? "#34D399"
      : "#3B82F6"

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.fullscreenOverlay}
      onPress={() => setContextError(null)}
    >
      <Animated.View
        style={[
          styles.container,
          {
            height: heightAnim,
            opacity: opacityAnim,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Text style={styles.text}>{context_error?.message}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  fullscreenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    width: "80%", // נראה הרבה יותר טוב באמצע
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
})

export default ErrorAlert
