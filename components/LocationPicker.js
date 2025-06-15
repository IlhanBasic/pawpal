import {
  View,
  Alert,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { getMapPreview } from "../utils/location";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { LocationContext } from "../store/context/location";
import { Ionicons } from "@expo/vector-icons";

function LocationPicker({ inputData, setInputData, setShow }) {
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
    if (!hasPermission) return;

    const location = await Location.getCurrentPositionAsync({ timeout: 5000 });

    setInputData({
      ...inputData,
      lokacija: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
    locationCtx.setLat(location.coords.latitude);
    locationCtx.setLng(location.coords.longitude);
  };

  const pickCustomLocationHandler = () => {
    setShow(false);
    navigation.navigate("Map");
  };

  useEffect(() => {
    setInputData((prevData) => ({
      ...prevData,
      lokacija: {
        latitude: locationCtx.lat,
        longitude: locationCtx.lng,
      },
    }));
  }, [locationCtx.lat, locationCtx.lng]);

  return (
    <View style={styles.container}>
      <View style={styles.previewContainer}>
        {inputData.lokacija ? (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(locationCtx.lat, locationCtx.lng),
            }}
          />
        ) : (
          <Text style={styles.placeholderText}>No location picked yet</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={pickUserLocationHandler}>
        <Ionicons name="locate" size={20} color="#fff" />
        <Text style={styles.buttonText}>Use My Location</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={pickCustomLocationHandler}
      >
        <Ionicons name="map-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>Pick on Map</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  previewContainer: {
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
    color: "#888",
    fontSize: 14,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 5,
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
