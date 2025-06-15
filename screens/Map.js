import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 43.38337,
          longitude: 19.67461,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          title="Tvoja lokacija"
          coordinate={{ latitude: 43.38337, longitude: 19.67461 }}
        />
      </MapView>
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
});
