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
function EditForm({
  selectedDog,
  setSelectedDog,
  updateDogSubmitHandler,
  setIsEditing,
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
            placeholder="Opis"
            placeholderTextColor={COLORS.placeholder}
            style={styles.textInput}
            value={selectedDog.opis}
            onChangeText={(text) =>
              setSelectedDog({ ...selectedDog, opis: text })
            }
          />
          <CustomImagePicker
            inputData={selectedDog}
            setInputData={setSelectedDog}
          />
          <LocationPicker
            inputData={selectedDog}
            setInputData={setSelectedDog}
            setShow={setIsEditing}
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
  );
}

export default EditForm;

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
