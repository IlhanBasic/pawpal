import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Button,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Pressable,
} from "react-native";
import axios from "axios";
import {API_URL} from '@env';
import {PUSH_NOTIFICATION_EXPO_API} from '@env';
import COLORS from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useEffect, useLayoutEffect, useState } from "react";
import SubmitButton from "../components/SubmitButton";
import { useContext } from "react";
import { DogsContext } from "../store/context/dogs";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { addDogAsync, storePushToken } from "../utils/http";
import LoaderOverlay from "../components/LoaderOverlay";
import { AuthContext } from "../store/context/auth";
import * as Notifications from "expo-notifications";
//prikazuje notifikacije
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

function Home({ navigation }) {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required",
          "Push notifications need the appropriate permissions."
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      await storePushToken(pushTokenData.data, authCtx.token);
      authCtx.setPushToken(pushTokenData.data);
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);
  // useEffect(() => {
  //   //notifikacija primljena
  //   const subscription1 = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("Notifikacija primljena");
  //       console.log(notification);
  //       const userName = notification.request.content.data.userName;
  //       console.log(userName);
  //     }
  //   );
  //   //kliknuto na notifikaciju
  //   const subscription2 = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       console.log("Odgovoreno na notifikaciju");
  //       console.log(response);
  //       const userName = response.notification.request.content.data.userName;
  //       console.log(userName);
  //     }
  //   );

  //   return () => {
  //     subscription1.remove();
  //     subscription2.remove();
  //   };
  // }, []);

  const [tok, setTok] = useState(null);
  const authCtx = useContext(AuthContext);
  useFonts({
    "header-font": require("../assets/fonts/Matcha-EaLge.ttf"),
  });
  const [isFetching, setIsFetching] = useState(false);
  const [showModal, setShowModal] = useState();
  const [inputData, setInputData] = useState({
    ime: "",
    rasa: "",
    starost: 0,
    tezina: 0,
    boja: "",
    pol: "",
    slika: "",
    opis: "",
  });
  useEffect(() => {
    axios
      .get(`${API_URL}auth=${authCtx.token}/protected.json`)
      .then((response) => {
        setTok(response.data);
      });
  }, [authCtx.token]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            style={styles.logoutBtn}
            onPress={() =>
              Alert.alert("Logout", "Are you sure?", [
                { text: "NO", style: "destructive" },
                {
                  text: "YES",
                  onPress: () => {
                    authCtx.logout();
                    navigation.navigate("Login");
                  },
                },
              ])
            }
          >
            <FontAwesome5 name="user-alt-slash" size={24} color="white" />
          </Pressable>
        );
      },
    });
  }, [authCtx.token]);
  const { addDog, dogs } = useContext(DogsContext);
  function sendPushNotificationHandler() {
    fetch(`${PUSH_NOTIFICATION_EXPO_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `${authCtx.pushToken}`,
        title: "Test - sent from a device!",
        body: "Push Notification!",
      }),
    });
  }
  async function addDogHandler() {
    if (inputData.ime === "")
      Alert.alert("Unesite validno ime", "Ime mora biti najmanje 2 karaktera", [
        { text: "OK", style: "destructive" },
      ]);
    if (inputData.rasa === "")
      Alert.alert(
        "Unesite validnu rasu",
        "Rasa mora biti najmanje 2 karaktera",
        [{ text: "OK", style: "destructive" }]
      );
    if (inputData.starost === 0 || inputData.starost < 0)
      Alert.alert(
        "Unesite validnu starost",
        "Starost mora biti pozitivan broj",
        [{ text: "OK", style: "destructive" }]
      );
    if (inputData.tezina === 0 || inputData.tezina < 0)
      Alert.alert("Unesite validnu tezinu", "Tezina mora biti pozitivan broj", [
        { text: "OK", style: "destructive" },
      ]);
    if (inputData.boja === "")
      Alert.alert("Unesite validnu boju", "Boja mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
    if (inputData.pol === "")
      Alert.alert("Unesite validan pol", "Pol mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
    if (inputData.slika === "")
      Alert.alert("Unesite validnu sliku", "Slika mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
    if (inputData.opis === "")
      Alert.alert("Unesite validni opis", "Opis mora biti string", [
        { text: "OK", style: "destructive" },
      ]);
    addDog(inputData);
    setIsFetching(true);
    await addDogAsync(inputData);
    setIsFetching(false);
    setShowModal(false);
    setInputData({
      ime: "",
      rasa: "",
      starost: 0,
      tezina: 0,
      boja: "",
      pol: "",
      slika: "",
      opis: "",
    });
    const d = Date.now();
    const date = d + 1000 * 2;
    //notifikacija se zakazuje
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Dodali ste novog psa",
        body: `Pas sa imenom ${inputData.ime} je dodat`,
        data: { userName: "Ilhan" },
        sound: "default",
      },
      trigger: {
        date: new Date(date),
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });
    sendPushNotificationHandler();
  }
  if (isFetching) {
    return <LoaderOverlay message="Dodavanje..." />;
  }
  let content = (
    <LinearGradient
      colors={["#FF6C00", "green"]}
      style={styles.backgroundImage}
    >
      <ImageBackground
        source={require("../assets/dogs.webp")}
        style={styles.backgroundImage}
        resizeMethod="resize"
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
      >
        <SafeAreaView>
          <Text style={styles.title}>DEMO DOGS</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonContent}>
              <PrimaryButton onPress={() => setShowModal(true)}>
                <Ionicons size={24} color={COLORS.dark} name="paw" />
                <Text>Dodaj</Text>
              </PrimaryButton>
            </View>
            <View style={styles.buttonContent}>
              <PrimaryButton onPress={() => navigation.navigate("List")}>
                <FontAwesome name="list" size={24} color="black" />
                <Text>Lista</Text>
              </PrimaryButton>
            </View>
          </View>
          <Text>{tok}</Text>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
  if (showModal) {
    content = (
      <Modal style={styles.modal} visible={showModal} animationType="slide">
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
                value={inputData.ime}
                onChangeText={(text) =>
                  setInputData({ ...inputData, ime: text })
                }
              />
              <TextInput
                placeholder="Rasa"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={inputData.rasa}
                onChangeText={(text) =>
                  setInputData({ ...inputData, rasa: text })
                }
              />
              <TextInput
                placeholder="Tezina"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={inputData.tezina}
                onChangeText={(text) =>
                  setInputData({ ...inputData, tezina: text })
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
                value={inputData.pol}
                onChangeText={(text) =>
                  setInputData({ ...inputData, pol: text })
                }
              />
              <TextInput
                placeholder="Startost"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={inputData.starost}
                onChangeText={(text) =>
                  setInputData({ ...inputData, starost: text })
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
                value={inputData.boja}
                onChangeText={(text) =>
                  setInputData({ ...inputData, boja: text })
                }
              />
              <TextInput
                placeholder="Slika"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={inputData.slika}
                onChangeText={(text) =>
                  setInputData({ ...inputData, slika: text })
                }
              />
              <TextInput
                placeholder="Opis"
                placeholderTextColor={COLORS.placeholder}
                style={styles.textInput}
                value={inputData.opis}
                onChangeText={(text) =>
                  setInputData({ ...inputData, opis: text })
                }
              />
              <SubmitButton onPress={addDogHandler}>Dodaj</SubmitButton>
              <View style={{ marginTop: 10 }}>
                <Button
                  title="Odustani"
                  color={COLORS.primary}
                  onPress={() => setShowModal(false)}
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
export default Home;
const styles = StyleSheet.create({
  logoutBtn: {
    paddingHorizontal: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
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
