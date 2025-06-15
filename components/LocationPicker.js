import { View, Button, Alert, Text, Image, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { getMapPreview } from "../utils/location";
import { useNavigation } from "@react-navigation/native";
import { useContext, useCallback, useEffect } from "react";
import { LocationContext } from "../store/context/location";
function LocationPicker({ inputData, setInputData }) {
  const locationCtx = useContext(LocationContext);

  const navigation = useNavigation();
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

  const pickUserLocationHandler = async () => {
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
  };

  async function pickCustomLocationHandler() {
    navigation.navigate("Map");
  }
  useEffect(() => {
    setInputData((prevData) => {
      return {
        ...prevData,
        lokacija: {
          latitude: locationCtx.lat,
          longitude: locationCtx.lng,
        },
      };
    });
  }, [locationCtx.lat, locationCtx.lng]);
  return (
    <View style={{ margin: 20 }}>
      <View style={{ marginBottom: 10 }}>
        {inputData.lokacija ? (
          <Image
            style={styles.img}
            source={{
              uri: getMapPreview(locationCtx.lat, locationCtx.lng),
            }}
          />
        ) : (
          <Text>No location picked yet</Text>
        )}
      </View>
      <Button title="Vaša lokacija" onPress={pickUserLocationHandler} />
      <Button title="Odaberi lokaciju" onPress={pickCustomLocationHandler} />
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
