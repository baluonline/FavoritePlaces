import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function onAddNewPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
    // navigation.navigate("AllPlaces", {
    //   place: place,
    // });
  }
  return <PlaceForm onAddPlace={onAddNewPlaceHandler} />;
}

export default AddPlace;
