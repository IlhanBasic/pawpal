import axios from "axios";
import { Alert } from "react-native";
import {API_URL} from '@env'
export async function addDogAsync(dog) {
  try {
    const response = await axios.post(`${API_URL}/dogs.json`, dog);
    return response.data;
  } catch (err) {
    Alert.alert("Greska", "Dog nije dodat", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}

export async function removeDogAsync(id) {
  try {
    const response = await axios.delete(`${API_URL}/dogs/${id}.json`);
    return response.data;
  } catch (err) {
    Alert.alert("Greska", "Dog nije obrisan", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}

export async function updateDogAsync(id, dog) {
  try {
    const response = await axios.put(`${API_URL}/dogs/${id}.json`, dog);
    return response.data;
  } catch (err) {
    Alert.alert("Greska", "Dog nije azuriran", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}

export async function getDogsAsync() {
  try {
    const response = await axios.get(`${API_URL}/dogs.json`);
    if (response.data) {
      const dogsArray = Object.keys(response.data).map((key) => ({
        name: key,
        ...response.data[key],
      }));
      return dogsArray;
    } else {
      return [];
    }
  } catch (err) {
    Alert.alert("Greska", "Dogovi nisu ucitani", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}
export async function addFavoriteAsync(dog) {
  try {
    const existingDogs = await getFavoritesAsync();
    const existingDogIds = existingDogs.map((dog) => dog.name);
    let response = null;
    if (!existingDogIds.includes(dog.name)) {
      response = await axios.post(`${API_URL}/favorites.json`, dog);
    } else {
      response = await axios.put(`${API_URL}/favorites/${dog.name}.json`, dog);
    }
    return response.data;
  } catch (err) {
    Alert.alert("Greska", "Dog nije dodat", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}

export async function removeFavoriteAsync(id) {
  try {
    const response = await axios.delete(`${API_URL}/favorites/${id}.json`);
    return response.data;
  } catch (err) {
    Alert.alert("Greska", "Dog nije obrisan", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}
export async function getFavoritesAsync() {
  try {
    const response = await axios.get(`${API_URL}/favorites.json`);
    if (response.data) {
      const dogsArray = Object.keys(response.data).map((key) => ({
        name: key,
        ...response.data[key],
      }));
      return dogsArray;
    } else {
      return [];
    }
  } catch (err) {
    Alert.alert("Greska", "Dogovi nisu ucitani", [
      { text: "OK", style: "destructive" },
    ]);
    throw err;
  }
}
export async function storePushToken(pushToken, authToken) {
  try {
    const res = await axios.get(`${API_URL}/pushTokens.json?auth=${authToken}`);
    const tokens = res.data;

    const tokenAlreadyStored =
      tokens && Object.values(tokens).some(entry => entry.token === pushToken);

    if (tokenAlreadyStored) {
      return;
    }

    const response = await axios.post(
      `${API_URL}/pushTokens.json?auth=${authToken}`,
      {
        userToken: authToken,
        token: pushToken,
      }
    );

    return response.data;
  } catch (err) {
    Alert.alert(
      "Greška prilikom spremanja push tokena",
      "Morate biti prijavljeni: " + err.message,
      [{ text: "OK", style: "destructive" }]
    );
    throw err;
  }
}