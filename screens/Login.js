import { TextInput, View, Text, StyleSheet, Button, Pressable } from "react-native";
import { loginUser } from "../utils/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../store/context/auth";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
function Login() {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  async function handleLogin() {
    if (userInput.username.trim() === "" || userInput.password.trim() === "") {
      Alert.alert("Greška", "Polja ne smeju biti prazna", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }
    const token = await loginUser(userInput.username, userInput.password);
    authCtx.authenticate(token);
    navigation.navigate("Menu");
  }

  return (
    <View style={styles.authForm}>
      <Text style={styles.heading}>Welcome Back</Text>

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

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.outlineButton]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={[styles.buttonText, styles.outlineText]}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

export default Login;

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
    backgroundColor: "#007bff",
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
    borderColor: "#007bff",
  },
  outlineText: {
    color: "#007bff",
  },
});
