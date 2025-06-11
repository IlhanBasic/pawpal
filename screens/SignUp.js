import { useContext, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { createUser } from "../utils/auth";
import { AuthContext } from "../store/context/auth";

function SignUp({ navigation }) {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const authCtx = useContext(AuthContext);

  async function handleSignUp() {
    if (userInput.username.trim() === "" || userInput.password.trim() === "") {
      Alert.alert("Greška", "Polja ne smeju biti prazna", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    const token = await createUser(userInput.username, userInput.password);
    authCtx.authenticate(token);
    navigation.navigate("Login");
  }

  return (
    <View style={styles.authForm}>
      <Text style={styles.heading}>Create Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={userInput.username}
          onChangeText={(text) =>
            setUserInput((prevState) => ({ ...prevState, username: text }))
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          value={userInput.password}
          onChangeText={(text) =>
            setUserInput((prevState) => ({ ...prevState, password: text }))
          }
        />
      </View>

      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.outlineButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={[styles.buttonText, styles.outlineText]}>Login</Text>
      </Pressable>
    </View>
  );
}

export default SignUp;
const styles = StyleSheet.create({
  authForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f0f4f8",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#555",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  button: {
    width: "100%",
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#28a745",
  },
  outlineText: {
    color: "#28a745",
  },
});
