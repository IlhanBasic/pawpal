import { Pressable, Text, StyleSheet, Animated, Easing } from "react-native";
import COLORS from "../constants/colors";
import { useEffect, useRef } from "react";

function SubmitButton({ onPress, children, style }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    // Pulse animation on press
    Animated.sequence([
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
        },
        style
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressable}
        android_ripple={{ color: COLORS.primaryDark, borderless: false }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  pressable: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    includeFontPadding: false, // Remove extra padding for Android
    textAlign: 'center',
  },
});