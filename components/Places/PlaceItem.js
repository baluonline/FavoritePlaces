import { View, Text, Image, Pressable, StyleSheet, Button } from "react-native";
import Colors from "../../Constants/Colors";

function PlaceItem({ place, onSelect }) {
  const placeItem = place.item;
  // console.log(JSON.stringify(placeItem));
  return (
    <Pressable
      style={({ pressed }) => [styles.item,pressed && styles.pressed]}
      onPress={onSelect.bind(this,placeItem.id)}
    >
      <Image style={styles.image} source={{ uri: placeItem.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>title: {placeItem.title}</Text>
        <Text style={styles.title}>location: {placeItem.location.lat}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flex:1,
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex:1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,

    marginLeft:5,
    marginRight:5
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
});
