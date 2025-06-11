import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FavoritesContext } from "../store/context/favorites";
import DogCard from "../components/DogCard";
import COLORS from "../constants/colors";
function FavoritesScreen() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item, index) => item?.name?.toString?.() ?? index.toString()}
      renderItem={({ item }) => <DogCard dog={item} />}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>❤️ Lista je prazna.</Text>
        </View>
      )}
    />
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: COLORS.background, 
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.textDark,
    textAlign: "center",
    fontFamily: "header-font",
    marginBottom: 30,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  container: {
    padding: 24,
    alignItems: "center",
    backgroundColor: COLORS.light,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: "cover",
  },
  infoContainer: {
    width: "100%",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 16,
    marginTop: 20,
    color: COLORS.textLight,
    lineHeight: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 30,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.light,
    color: COLORS.textDark,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 17,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
});
