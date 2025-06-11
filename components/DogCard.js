import { Pressable, Image, StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors"; // koristiš već u projektu
import { useNavigation } from "@react-navigation/native";

function DogCard({ dog }) {
  const navigation = useNavigation();
  function navigateForMoreInfo() {
    navigation.navigate("Details", { dogId: dog.name });
  }
  return (
    <Pressable style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]} android_ripple={{opacity: 0.5}}  onPress={navigateForMoreInfo}>
      <Image source={{ uri: dog.slika }} style={styles.dogImg} />
      <View style={styles.dogInfo}>
        <Text style={styles.dogName}>{dog.ime}</Text>
        <Text style={styles.dogDetail}>Rasa: {dog.rasa}</Text>
        <Text style={styles.dogDetail}>Starost: {dog.starost} god.</Text>
        <Text style={styles.dogDetail}>Težina: {dog.tezina} kg</Text>
        <Text style={styles.dogDetail}>Boja: {dog.boja}</Text>
        <Text style={styles.dogDetail}>Pol: {dog.pol}</Text>
        <Text style={styles.dogDescription}>{dog.opis}</Text>
      </View>
    </Pressable>
  );
}

export default DogCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    marginVertical: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  dogImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
  dogInfo: {
    padding: 16,
  },
  dogName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.dark,
  },
  dogDetail: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  dogDescription: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 8,
    fontStyle: "italic",
  },
  pressed:{
    opacity: 0.75
  }
});
