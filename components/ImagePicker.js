import { useState } from "react";
import { Alert, View, Text, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

function CustomImagePicker() {
  const [selectedImage, setSelectedImage] = useState(null);

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
    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      console.log("image", image.assets[0].uri);
      setSelectedImage(image.assets[0].uri);
    }
  }

  return (
    <View>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.img} />
      ) : (
        <Text>No image selected</Text>
      )}
      <Button title="Take Image" onPress={pickImageHandler} />
    </View>
  );
}

export default CustomImagePicker;
const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
});
