import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
function LoaderOverlay({ message }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <FontAwesome name="paw" size={64} color="white" style={{ marginTop: 12 }} />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  message: {
    color: "white",
    fontSize: 18,
    marginTop: 12,
  },
});
