import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FavoritesContext } from "../store/context/favorites";
import DogCard from "../components/DogCard";

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
  listContainer: {
    paddingVertical: 12,
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    fontStyle: "italic",
  },
});
