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
    paddingHorizontal: 32,
    backgroundColor: "#F8FAFD"
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    fontFamily: "title-font",
    color: "#1A1A2E",
    marginBottom: 40,
    letterSpacing: -0.5,
    textAlign: "center"
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24
  },
  label: {
    fontSize: 15,
    fontFamily: "body-font",
    marginBottom: 10,
    color: "#4A5568",
    fontWeight: "600",
    marginLeft: 4
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    color: "#1A202C",
    fontFamily: "body-font",
    shadowColor: "#3182CE",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  inputFocused: {
    borderColor: "#007bff",
    shadowColor: "#007bff",
    shadowOpacity: 0.15
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#0056b3",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "body-font",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.25
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007bff",
    marginTop: 12
  },
  outlineText: {
    color: "#007bff"
  },
  buttonIcon: {
    marginRight: 12
  },
  footerText: {
    marginTop: 24,
    textAlign: "center",
    fontFamily: "body-font",
    color: "#718096",
    fontSize: 14
  },
  linkText: {
    color: "#007bff",
    fontWeight: "600",
    fontFamily: "body-font",
  },
  passwordToggle: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 8
  }
});
