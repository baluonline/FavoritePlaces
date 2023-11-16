import { FlatList } from "react-native-gesture-handler";
import PlaceItem from "./PlaceItem";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../Constants/Colors";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation=useNavigation();

  function selectPlaceHandler(id){
    navigation.navigate('placeDetails',{
      placeId:id
    })
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  // console.log(JSON.stringify(places))
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={places}
        keyExtractor={(item) => item.location.lat}
        renderItem={(item) => <PlaceItem place={item} onSelect={selectPlaceHandler}/>}
      />
    </View>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  listContainer:{
    flex:1,
    padding:5
  }
});
