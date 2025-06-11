import { Pressable, Text, StyleSheet } from "react-native";
import COLORS from "../constants/colors";

function SubmitButton({ onPress, children }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
