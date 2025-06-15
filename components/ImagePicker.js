import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function CustomImagePicker({ inputData, setInputData }) {
  async function verifyPermissions() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this feature."
      );
      return false;
    }
    return true;
  }

  async function pickImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setInputData({ ...inputData, slika: image.assets[0].uri });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {inputData.slika ? (
          <Image source={{ uri: inputData.slika }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected yet</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={pickImageHandler}>
        <Ionicons name="camera" size={20} color="#fff" />
        <Text style={styles.buttonText}>Take Image</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomImagePicker;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  imagePreview: {
    width: 250,
    height: 200,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    color: "#777",
    fontSize: 14,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
