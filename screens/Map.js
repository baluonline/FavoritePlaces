import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import OutlinedButton from "../UI/OutlinedButton";

function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  const [selectedLocation, setSelectedLocation] = useState({
    initialLocation,
  });

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHandler(event) {
    // console.log(event);
    if(initialLocation){
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    if (lat) {
      setSelectedLocation({ lat: lat, lng: lng });
    }
  }

  // here useCallback will help us to avoid unneccessary multiple rendering and it renders
  // only when navigation and selectedLocation changes as these are dependencies.
  // or stops infinite loops and make good performance .
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation.lat) {
      Alert.alert(
        "No location picked",
        "You have to pick a location (by tapping on the map) first"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if(initialLocation){
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <OutlinedButton iconText="Add" onPress={savePickedLocationHandler} />
      ),
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.mapView}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          title="Picked location"
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
