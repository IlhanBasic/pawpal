import { useState, useContext } from "react";
import { Button, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LocationContext } from "../store/context/location";

function Map({ navigation }) {
  const locationCtx = useContext(LocationContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  function selectLocationHandler(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
  }
  function saveLocation() {
    locationCtx.setLat(selectedLocation.lat);
    locationCtx.setLng(selectedLocation.lng);
    navigation.goBack();
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 90,
          longitude: 20,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={selectLocationHandler}
      >
        {selectedLocation && (
          <Marker
            title="Selected Location"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>
      <Button title="Sacuvaj lokaciju" onPress={saveLocation} />
    </>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
