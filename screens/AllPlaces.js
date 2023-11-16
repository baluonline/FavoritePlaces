import { FlatList } from "react-native-gesture-handler";
import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();

      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();

      // setLoadedPlaces(curPlaces => [...curPlaces,route.params.place])
    }
  }, [isFocused]);

  return <PlacesList style={styles.placeList} places={loadedPlaces} />;
}

export default AllPlaces;

const styles = StyleSheet.create({
  placeList: {
    flex: 1,
  },
});
