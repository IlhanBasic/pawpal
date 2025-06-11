import { Pressable, Image, StyleSheet, View, Text } from "react-native";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

function DogCard({ dog }) {
  const navigation = useNavigation();
  
  function navigateForMoreInfo() {
    navigation.navigate("Details", { dogId: dog.name });
  }

  return (
    <Pressable 
      style={({ pressed }) => [styles.cardContainer, pressed && styles.pressed]} 
      android_ripple={{color: COLORS.primaryLight, borderless: false}}  
      onPress={navigateForMoreInfo}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: dog.slika }} style={styles.dogImg} />
        <View style={styles.overlay} />
      </View>
      
      <View style={styles.dogInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.dogName}>{dog.ime}</Text>
          <Text style={styles.dogBreed}>{dog.rasa}</Text>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Starost:</Text>
            <Text style={styles.detailValue}>{dog.starost} god.</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Težina:</Text>
            <Text style={styles.detailValue}>{dog.tezina} kg</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Boja:</Text>
            <Text style={styles.detailValue}>{dog.boja}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Pol:</Text>
            <Text style={styles.detailValue}>{dog.pol}</Text>
          </View>
        </View>
        
        <Text style={styles.dogDescription} numberOfLines={2} ellipsizeMode="tail">
          {dog.opis}
        </Text>
        
        <Text style={styles.moreInfoText}>Dodirni za više informacija</Text>
      </View>
    </Pressable>
  );
}

export default DogCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.light,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  imageContainer: {
    position: 'relative',
  },
  dogImg: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  dogInfo: {
    padding: 18,
  },
  nameContainer: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
    paddingBottom: 8,
  },
  dogName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.dark,
    letterSpacing: 0.5,
  },
  dogBreed: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '500',
    width: '40%',
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '600',
    width: '60%',
    textAlign: 'right',
  },
  dogDescription: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
    marginBottom: 12,
  },
  moreInfoText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  }
});