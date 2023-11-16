import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { useState, useEffect } from "react";

import OutlinedButton from "../UI/OutlinedButton";
import Colors from "../Constants/Colors";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [placeDetail, setPlaceDetails] = useState("");
  function showMapHandler() {
    //   let initialLocation = {
    //   initialLat: 0.0,
    //   initialLng: 0.0,
    // };
    // if (placeDetail) {
    //   initialLocation = {
    //     initialLat: placeDetail.location.lat,
    //     initialLng: placeDetail.location.lng,
    //   };
    // }

    navigation.navigate("Map", {
        initialLat: placeDetail.location.lat,
        initialLng: placeDetail.location.lng,
      });
  }
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
    // Fetch data using selectPlaceId
    async function loadPlaceDetails() {
      const place = await fetchPlaceDetails(selectedPlaceId);

      setPlaceDetails(place);
      navigation.setOptions({
        title: placeDetail.title,
      });
      console.log("place details " + JSON.stringify(placeDetail));
    }
    loadPlaceDetails();
  }, [selectedPlaceId]);
  if (!fetchPlaceDetails) {
    return <View style={styles.fallBack}>Loading place data</View>;
  }
  return (
    <ScrollView>
      <Image source={{ uri: placeDetail.imageUri }} style={styles.image} />

      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>Address</Text>
        </View>
        <OutlinedButton onPress={showMapHandler}>View on Map</OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
