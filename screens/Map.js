import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../store/context/location";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

function Map({ navigation }) {
  const locationCtx = useContext(LocationContext);
  const [selectedLocation, setSelectedLocation] = useState(null);

  function selectLocationHandler(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
  }

  function saveLocation() {
    if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
      return;
    }
    locationCtx.setLat(selectedLocation.lat);
    locationCtx.setLng(selectedLocation.lng);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 44.7866, // Beograd default
          longitude: 20.4489,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Odabrana lokacija"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>

      {!selectedLocation && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Dodirnite mapu da biste odabrali lokaciju
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={saveLocation}>
        <Ionicons name="checkmark" size={24} color="#fff" />
        <Text style={styles.buttonText}>Sačuvaj</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoBox: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    position: "absolute",
    bottom: 40,
    left: width / 2 - 80,
    backgroundColor: "#1e90ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
