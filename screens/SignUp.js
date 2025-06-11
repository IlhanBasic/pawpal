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
import COLORS from "../constants/colors";
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
    paddingHorizontal: 32,
    backgroundColor: COLORS.lightBackground,
  },
  heading: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.darkText,
    marginBottom: 40,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: COLORS.textSecondary,
    fontWeight: "600",
    marginLeft: 4,
  },
  input: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.darkText,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primaryLight,
    shadowOpacity: 0.2,
  },
  button: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: COLORS.primaryDark,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginTop: 12,
  },
  outlineText: {
    color: COLORS.primary,
  },
  buttonIcon: {
    marginRight: 10,
  },
  footerText: {
    marginTop: 24,
    textAlign: "center",
    color: COLORS.textSecondary,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});
