import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Platform,
  SafeAreaView,
  Modal,
} from "react-native";
import {
  updateDogAsync,
  removeDogAsync,
  addFavoriteAsync,
  removeFavoriteAsync,
} from "../utils/http";
import SubmitButton from "../components/SubmitButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { DogsContext } from "../store/context/dogs";
import { FavoritesContext } from "../store/context/favorites";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import COLORS from "../constants/colors";
import LoaderOverlay from "../components/LoaderOverlay";
function DogScreen({ route, navigation }) {
  const [selectedDog, setSelectedDog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { dogId } = route.params;
  const { dogs, removeDog, updateDog } = useContext(DogsContext);
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoritesContext);

  const dog = dogs.find((item) => item.name === dogId);
  console.log(dog);
  
  // Update favorite status when favorites or dogId changes
  useEffect(() => {
    setIsFavorite(favorites.some((item) => item.name === dogId));
  }, [favorites, dogId]);

  // Handle favorite toggle
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

  // Set up header options
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

    // Validate name
    if (!updatedDog.ime || updatedDog.ime.trim().length < 2) {
      Alert.alert("Unesite validno ime", "Ime mora biti najmanje 2 karaktera", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    // Validate breed
    if (!updatedDog.rasa || updatedDog.rasa.trim().length < 2) {
      Alert.alert(
        "Unesite validnu rasu",
        "Rasa mora biti najmanje 2 karaktera",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    // Validate age
    if (isNaN(updatedDog.starost) || updatedDog.starost <= 0) {
      Alert.alert(
        "Unesite validnu starost",
        "Starost mora biti pozitivan broj",
        [{ text: "OK", style: "destructive" }]
      );
      return;
    }

    // Validate weight
    if (isNaN(updatedDog.tezina) || updatedDog.tezina <= 0) {
      Alert.alert("Unesite validnu tezinu", "Tezina mora biti pozitivan broj", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    // Validate color
    if (!updatedDog.boja || typeof updatedDog.boja !== "string") {
      Alert.alert("Unesite validnu boju", "Boja mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    // Validate gender
    if (!updatedDog.pol || typeof updatedDog.pol !== "string") {
      Alert.alert("Unesite validan pol", "Pol mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    // Validate image
    if (!updatedDog.slika || typeof updatedDog.slika !== "string") {
      Alert.alert("Unesite validnu sliku", "Slika mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    // Validate description
    if (!updatedDog.opis || typeof updatedDog.opis !== "string") {
      Alert.alert("Unesite validni opis", "Opis mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    updateDog(updatedDog.name, updatedDog);
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
        <Text style={styles.description}>{dog.opis}</Text>
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
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView contentContainerStyle={styles.inputContainer}>
              <Text style={styles.title}>Unesite podatke:</Text>
              <TextInput
                placeholder="Ime"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.ime}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, ime: text })
                }
              />
              <TextInput
                placeholder="Rasa"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.rasa}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, rasa: text })
                }
              />
              <TextInput
                placeholder="Tezina"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.tezina}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, tezina: text })
                }
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="dark"
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="Pol"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.pol}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, pol: text })
                }
              />
              <TextInput
                placeholder="Startost"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.starost}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, starost: text })
                }
                autoCapitalize="none"
                autoCorrect={false}
                keyboardAppearance="dark"
                keyboardType="number-pad"
              />
              <TextInput
                placeholder="Boja"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.boja}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, boja: text })
                }
              />
              <TextInput
                placeholder="Slika"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.slika}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, slika: text })
                }
              />
              <TextInput
                placeholder="Opis"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={selectedDog.opis}
                onChangeText={(text) =>
                  setSelectedDog({ ...selectedDog, opis: text })
                }
              />
              <SubmitButton onPress={() => updateDogSubmitHandler(selectedDog)}>
                Izmeni
              </SubmitButton>
              <View style={{ marginTop: 10 }}>
                <Button
                  title="Odustani"
                  color={COLORS.primary}
                  onPress={() => setIsEditing(false)}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
  return content;
}

export default DogScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    fontFamily: "header-font",
    marginBottom: 40,
    letterSpacing: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    width: "100%",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 15,
    color: "#444",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.light,
    color: "#000",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
});
