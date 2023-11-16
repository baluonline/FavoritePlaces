import { View, Button, Alert, Image, StyleSheet, Text } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import * as ImagePickerLoader from "expo-image-picker";
import OutlinedButton from "../../UI/OutlinedButton";
import { useState } from "react";
import Colors from "../../Constants/Colors";

function ImagePicker({ onImageTaken }) {
  const [imagePicked, setImagePicked] = useState(null);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    // console.log(cameraPermissionInformation.status)
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } else if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use this app"
      );
    }
    return true;
  }

  // let image = await ImagePickerLoader.launchCameraAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //   allowsEditing: true,
  //   aspect: [1, 1],
  //   quality: 0.5,
  // });

  async function takeImageHandler() {
    const hasPermissions = await verifyPermissions();
    // console.log("camera " + hasPermissions);
    if (!hasPermissions) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImagePicked(image.uri);
    onImageTaken(image.uri);
    // console.log(image);
  }

  let imagePreview = (
    <Text style={styles.noImageText}> No image yet taken</Text>
  );
  if (imagePicked) {
    imagePreview = <Image source={{ uri: imagePicked }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imageContainer}>{imagePreview}</View>

      <OutlinedButton iconText="+" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: Colors.primary100,
    borderRadius: 5,
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
