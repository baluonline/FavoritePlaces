import { useState } from "react";
import { StyleSheet, View, Alert, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from "../../UI/OutlinedButton";
import Colors from "../../Constants/Colors";
import { getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import { useEffect } from "react";

function LocationPicker({ onLocationPicked }) {
  const [pickedLocation, setPickedLocation] = useState("");
  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      // console.log(JSON.stringify(mapPickedLocation));
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onLocationPicked(pickedLocation);
  }, [pickedLocation, onLocationPicked]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (
      locationPermissionInformation.status === PermissionStatus.DENIED
    ) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant location permissions to use this app"
      );
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    let location = await getCurrentPositionAsync();
    location = {
      lat: pickedLocation.coords.longitude,
      lng: pickedLocation.coords.latitudeg,
    };

    setPickedLocation(location);
    onLocationPicked(location);
  }
  function pickMapHandler() {
    navigation.navigate("Map");
  }

  let mapPreview = (
    <Text style={styles.noImageText}>Location is not yet picked</Text>
  );

  // console.log("pickedLocation " + JSON.stringify(pickedLocation));
  if (pickedLocation) {
    const imageUri = getMapPreview(pickedLocation.lat, pickedLocation.lng);

    const t =
      "https://bing.com/maps/default.aspx?cp=-122.0840043,37.4219959&lvl=14&style=r&key=Ar7ZdRvRZ5B7fK4bN0-BRMth9o13Nu_uL7SkpollXmWLts14XNAljlGTnGORrpqI&st=wt|fc:FF0000;lbc:00FF00_rd|fc:0000FF_g|landColor:FFFFFF";
    // mapPreview = <Image source={{ uri: imageUri }} style={styles.image} />;
    mapPreview = <Image source={{ uri: imageUri }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.mapPreview}>{mapPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton iconText="#" onPress={getLocationHandler}>
          Location User
        </OutlinedButton>
        <OutlinedButton iconText="*" onPress={pickMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
