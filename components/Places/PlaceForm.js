import { ScrollView, TextInput, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "../../Constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../../UI/Button";
import { useCallback } from "react";
import { Place } from "../../model/Place";

function PlaceForm({ onAddPlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  function onChangeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }

  function imageTakeHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const locationHandler = useCallback((location) => {
    setSelectedLocation(location);
    setSelectedAddress("new");
  }, []);
  function savePlaceHandler() {
    const placeData = new Place(enteredTitle, selectedImage, selectedLocation);
    onAddPlace(placeData);
  }
  return (
    <ScrollView style={styles.placeFormContainer}>
      <View>
        <Text style={styles.titleText}>Title</Text>
        <TextInput
          onChangeText={onChangeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        ></TextInput>
      </View>
      <ImagePicker onImageTaken={imageTakeHandler} />
      <LocationPicker onLocationPicked={locationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  placeFormContainer: {
    flex: 1,
    padding: 4,
  },
  titleText: {
    fontWeight: "bold",
    margin: 5,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary500,
  },
});
