import { FlatList, Image, Pressable, Text, View } from "react-native";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect} style={styles.itemContainer}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
}

function PlacesList({ places, onSelectPlace }) {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()} // Asegúrate de convertir el id a cadena
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={() => onSelectPlace(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 16,
    color: "#555",
  },
});

export default PlacesList;
