import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { ChevronDown } from "lucide-react-native";

const colorMap = {
  green: "#71A674",
  orange: "#FD954E",
  yellow: "#D1E38F",
  blue: "#84C7DA",
  lime: "#F9F081",
};





export default function InfoCard({ title, children, accentColor = "blue", defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const animation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;
  const [showContent, setShowContent] = useState(defaultOpen);

  useEffect(() => {
    if (isOpen) setShowContent(true); // מראה את התוכן מיד כשפותחים
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!isOpen) setShowContent(false); // מסתיר את התוכן כשנסגר
    });
  }, [isOpen]);

  return (
    <View style={styles.card}>
      
     <TouchableOpacity style={styles.header} onPress={() => setIsOpen(!isOpen)}>
  <View style={{ flex: 1 }}> 
    <Text style={styles.title}>{title}</Text>
  </View>
  <Animated.View
    style={{
      transform: [
        {
          rotate: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
          }),
        },
      ],
    }}
  >
    <ChevronDown size={20} color="#333" />
  </Animated.View>
</TouchableOpacity>

      {showContent && (
        <Animated.View
          style={{
            opacity: animation,
            transform: [{ scaleY: animation }],
            overflow: "hidden",
          }}
        >
          <View style={styles.contentContainer}>{children}</View>
        </Animated.View>
      )}
      <View style={[styles.accentBar, { backgroundColor: colorMap[accentColor] }]} />

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 10,
    overflow: "hidden",
    elevation: 3,
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: 'Rubik-Bold',
    color: '#333',
    
  },
  contentContainer: {
    padding: 16,
  },
});
