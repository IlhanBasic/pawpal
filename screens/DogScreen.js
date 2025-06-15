import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import {
  updateDogAsync,
  removeDogAsync,
  addFavoriteAsync,
  removeFavoriteAsync,
} from "../utils/http";
import { getMapPreview } from "../utils/location";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DogsContext } from "../store/context/dogs";
import { FavoritesContext } from "../store/context/favorites";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/colors";
import LoaderOverlay from "../components/LoaderOverlay";
import EditForm from "../components/EditForm";
import { LocationContext } from "../store/context/location";
function DogScreen({ route, navigation }) {
  const locationCtx = useContext(LocationContext);
  const [selectedDog, setSelectedDog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { dogId } = route.params;
  const { dogs, removeDog, updateDog } = useContext(DogsContext);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);
  const dog = dogs.find((item) => item.name === dogId);
  useEffect(() => {
    setIsFavorite(favorites.some((item) => item.name === dogId));
  }, [favorites, dogId]);

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsFetching(true);
      removeFavoriteAsync(dogId);
      setIsFetching(false);
      removeFromFavorites(dogId);
      setIsFavorite(false);
    } else {
      setIsFetching(true);
      addFavoriteAsync(dog);
      setIsFetching(false);
      addToFavorites(dog);
      setIsFavorite(true);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: dog?.ime || "Dog Details",
      headerRight: () => (
        <Pressable
          style={styles.centered}
          onPress={toggleFavorite}
          hitSlop={20}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? COLORS.secondary : COLORS.dark}
          />
        </Pressable>
      ),
    });
  }, [navigation, isFavorite, favorites, dog]);

  if (!dog) {
    return (
      <View style={styles.centered}>
        <Text>Pas nije pronađen.</Text>
      </View>
    );
  }
  function deleteDogHandler(id) {
    Alert.alert(
      "Brisanje",
      "Da li ste sigurni da zelite da obrisete ovog pasa?",
      [
        { text: "Otkazi", style: "destructive" },
        {
          text: "Da",
          style: "destructive",
          onPress: () => {
            removeDog(id);
            if (isFavorite) {
              removeFromFavorites(id);
              setIsFetching(true);
              removeFavoriteAsync(id);
              setIsFetching(false);
            }
            setIsFetching(true);
            removeDogAsync(id);
            setIsFetching(false);
          },
        },
      ]
    );
  }
  function updateDogHandler(dog) {
    setSelectedDog(dog);
    setIsEditing(true);
  }
  function updateDogSubmitHandler(dog) {
    const updatedDog = { ...dog, starost: +dog.starost, tezina: +dog.tezina };

    if (!updatedDog.ime || updatedDog.ime.trim().length < 2) {
      Alert.alert("Unesite validno ime", "Ime mora biti najmanje 2 karaktera", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (!updatedDog.rasa || updatedDog.rasa.trim().length < 2) {
      Alert.alert(
        "Unesite validnu rasu",
        "Rasa mora biti najmanje 2 karaktera",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    if (isNaN(updatedDog.starost) || updatedDog.starost <= 0) {
      Alert.alert(
        "Unesite validnu starost",
        "Starost mora biti pozitivan broj",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    if (isNaN(updatedDog.tezina) || updatedDog.tezina <= 0) {
      Alert.alert("Unesite validnu tezinu", "Tezina mora biti pozitivan broj", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (!updatedDog.boja || typeof updatedDog.boja !== "string") {
      Alert.alert("Unesite validnu boju", "Boja mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (!updatedDog.pol || typeof updatedDog.pol !== "string") {
      Alert.alert("Unesite validan pol", "Pol mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (!updatedDog.slika || typeof updatedDog.slika !== "string") {
      Alert.alert("Unesite validnu sliku", "Slika mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (!updatedDog.opis || typeof updatedDog.opis !== "string") {
      Alert.alert("Unesite validni opis", "Opis mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    updateDog(updatedDog.name, updatedDog);
    locationCtx.lat(0);
    locationCtx.lng(0);
    setIsFetching(true);
    updateDogAsync(updatedDog.name, updatedDog);
    setIsFetching(false);
    setIsEditing(false);
  }
  if (isFetching) {
    return <LoaderOverlay message="Ucitavanje..." />;
  }
  let content = (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: dog.slika }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{dog.ime}</Text>
        <Text style={styles.detail}>Rasa: {dog.rasa}</Text>
        <Text style={styles.detail}>Starost: {dog.starost} godina</Text>
        <Text style={styles.detail}>Težina: {dog.tezina} kg</Text>
        <Text style={styles.detail}>Boja: {dog.boja}</Text>
        <Text style={styles.detail}>Pol: {dog.pol}</Text>
        <Text style={styles.description}>Opis:{dog.opis}</Text>
        <Text>
          <Image
            source={{
              uri: getMapPreview(dog.lokacija.latitude, dog.lokacija.longitude),
            }}
            style={styles.image}
          />
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.centered}
          onPress={deleteDogHandler.bind(this, dog.name)}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="black"
          />
          <Text>Obrisi</Text>
        </Pressable>
        <Pressable
          style={styles.centered}
          onPress={updateDogHandler.bind(this, dog)}
        >
          <FontAwesome6 name="edit" size={24} color="black" />
          <Text>Uredi</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
  if (isEditing) {
    content = (
      <Modal style={styles.modal} visible={isEditing} animationType="slide">
        <EditForm
          selectedDog={selectedDog}
          setSelectedDog={setSelectedDog}
          updateDogSubmitHandler={updateDogSubmitHandler}
          setIsEditing={setIsEditing}
        />
      </Modal>
    );
  }
  return content;
}

export default DogScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    fontFamily: "title-font",
    marginBottom: 30,
    letterSpacing: 1.2,
  },
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: "cover",
  },
  infoContainer: {
    width: "100%",
  },
  name: {
    fontSize: 26,
    fontFamily: "body-font",
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    fontFamily: "body-font",

    color: COLORS.textLight,
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: "body-font",
    color: COLORS.textLight,
    lineHeight: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 30,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    fontFamily: "body-font",
    borderColor: COLORS.border,
    backgroundColor: COLORS.light,
    color: COLORS.textDark,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 17,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
});
