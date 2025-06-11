import { View, StyleSheet, Text, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function LoaderOverlay({ message = "Učitavanje..." }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <FontAwesome name="paw" size={64} color="#fff" />
      </Animated.View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default LoaderOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 24,
  },
  message: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "600",
    letterSpacing: 0.5,
    textAlign: "center",
  },
});
