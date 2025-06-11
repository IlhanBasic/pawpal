import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
} from "react-native-gesture-handler";
import SubmitButton from "./SubmitButton";
import { useContext } from "react";
import { DogsContext } from "../store/context/dogs";
import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
function Form({ setShowModal }) {
  const { addDog } = useContext(DogsContext);
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
  function addDogHandler() {
    addDog(inputData);
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
  }
  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      <Text style={styles.title}>Unesite podatke:</Text>
      <TextInput
        placeholder="Ime"
        style={styles.textInput}
        value={inputData.ime}
        onChangeText={(text) => setInputData({ ...inputData, ime: text })}
      />
      <TextInput
        placeholder="Rasa"
        style={styles.textInput}
        value={inputData.rasa}
        onChangeText={(text) => setInputData({ ...inputData, rasa: text })}
      />
      <TextInput
        placeholder="Tezina"
        style={styles.textInput}
        value={inputData.tezina}
        onChangeText={(text) => setInputData({ ...inputData, tezina: text })}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardAppearance="dark"
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Pol"
        style={styles.textInput}
        value={inputData.pol}
        onChangeText={(text) => setInputData({ ...inputData, pol: text })}
      />
      <TextInput
        placeholder="Startost"
        style={styles.textInput}
        value={inputData.starost}
        onChangeText={(text) => setInputData({ ...inputData, starost: text })}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardAppearance="dark"
        keyboardType="number-pad"
      />
      <TextInput
        placeholder="Boja"
        style={styles.textInput}
        value={inputData.boja}
        onChangeText={(text) => setInputData({ ...inputData, boja: text })}
      />
      <TextInput
        placeholder="Slika"
        style={styles.textInput}
        value={inputData.slika}
        onChangeText={(text) => setInputData({ ...inputData, slika: text })}
      />
      <TextInput
        placeholder="Opis"
        style={styles.textInput}
        value={inputData.opis}
        onChangeText={(text) => setInputData({ ...inputData, opis: text })}
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
  );
}
export default Form;
const styles = StyleSheet.create({
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
    color: COLORS.dark,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 1,
  },
});
