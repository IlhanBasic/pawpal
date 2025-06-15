import { StyleSheet } from "react-native";
import CustomImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import SubmitButton from "./SubmitButton";
function Form() {
  return (
    <>
      <View style={styles.form}>
        <CustomImagePicker />
        <LocationPicker />
        <SubmitButton />
      </View>
    </>
  );
}
export default Form;
const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
