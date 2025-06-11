import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { DogsContext } from "../store/context/dogs";
import DogCard from "../components/DogCard";

function ListScreen() {
  const { dogs } = useContext(DogsContext);

  return (
    <FlatList
      data={dogs}
      keyExtractor={(item, index) => item?.name?.toString?.() ?? index.toString()}
      renderItem={({ item }) => <DogCard dog={item} />}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🐾 Lista je prazna.</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
}

export default ListScreen;

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
