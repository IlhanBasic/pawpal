import { useState } from "react";
import { View, Button, Alert, Text, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { getMapPreview } from "../utils/location";
function LocationPicker({ inputData, setInputData }) {
  async function verifyPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this feature."
      );
      return false;
    }

    return true;
  }

  async function pickLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

    setInputData({
      ...inputData,
      lokacija: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  }

  return (
    <View style={{ margin: 20 }}>
      <View style={{ marginBottom: 10 }}>
        {inputData.lokacija ? (
          <Image
            style={styles.img}
            source={{
              uri: getMapPreview(
                inputData.lokacija.latitude,
                inputData.lokacija.longitude
              ),
            }}
          />
        ) : (
          <Text>No location picked yet</Text>
        )}
      </View>
      <Button title="Pick Location" onPress={pickLocationHandler} />
    </View>
  );
}

export default LocationPicker;
const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
  },
});
