import axios from "axios";
import { Alert } from "react-native";
import { AUTH_API_URL, API_KEY } from "@env";
export async function createUser(username, password) {
  try {
    const response = await axios.post(`${AUTH_API_URL}signUp?key=${API_KEY}`, {
      email: username,
      password: password,
      returnSecureToken: true,
    });
    return response.data.idToken;
  } catch (err) {
    Alert.alert("Greska", "Greška prilikom kreiranja naloga " + err.message, [
      { text: "OK", style: "destructive" },
    ]);
    return;
  }
}
export async function loginUser(username, password) {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}signInWithPassword?key=${API_KEY}`,
      {
        email: username,
        password: password,
        returnSecureToken: true,
      }
    );
    return response.data.idToken;
  } catch (err) {
    Alert.alert("Greska", "Greška prilikom prijave" + err.message, [
      { text: "OK", style: "destructive" },
    ]);
    return;
  }
}
