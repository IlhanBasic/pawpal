import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SubmitButton from "./SubmitButton";
import COLORS from "../constants/colors";
import CustomImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function CreateForm({
  inputData,
  setInputData,
  addDogHandler,
  setShowModal,
}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.title}>Unesite podatke:</Text>
          <TextInput
            placeholder="Ime"
            placeholderTextColor={COLORS.placeholder}
            style={styles.textInput}
            value={inputData.ime}
            onChangeText={(text) => setInputData({ ...inputData, ime: text })}
          />
          <TextInput
            placeholder="Rasa"
            placeholderTextColor={COLORS.placeholder}
            style={styles.textInput}
            value={inputData.rasa}
            onChangeText={(text) => setInputData({ ...inputData, rasa: text })}
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
            onChangeText={(text) => setInputData({ ...inputData, pol: text })}
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
            onChangeText={(text) => setInputData({ ...inputData, boja: text })}
          />
          <TextInput
            placeholder="Opis"
            placeholderTextColor={COLORS.placeholder}
            style={styles.textInput}
            value={inputData.opis}
            onChangeText={(text) => setInputData({ ...inputData, opis: text })}
          />
          <CustomImagePicker
            inputData={inputData}
            setInputData={setInputData}
          />
          <LocationPicker
            inputData={inputData}
            setInputData={setInputData}
          />
          <SubmitButton onPress={addDogHandler}>Dodaj</SubmitButton>
          <View style={{ marginTop: 10, marginBottom: 30 }}>
            <Button
              title="Odustani"
              color={COLORS.primary}
              onPress={() => setShowModal(false)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CreateForm;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.light,
    color: "#000",
    fontFamily: "body-font",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "title-font",
    marginBottom: 40,
    color: COLORS.darkText,
    letterSpacing: 1,
  },
});
