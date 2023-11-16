import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Colors from "./Constants/Colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import { compose } from "@reduxjs/toolkit";
import PlaceDetails from "./screens/PlaceDetails";
// import Colors  from "./Constants/Colors";

// import Ionicons from '@expo/vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);
  if (!dbInitialized) {
    return <AppLoading />;
  }
  return (
    <>
      <StatusBar style="white" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Visited Places",
              headerRight: ({ tintColor }) => (
                <Button
                  onPress={() => navigation.navigate("AddPlace")}
                  title="+"
                  style={[styles.addPlacebtn, { color: "#910303" }]}
                  color={tintColor}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            options={{
              title: "Add a new place",
            }}
            component={AddPlace}
          />

          <Stack.Screen
            name="Map"
            options={{
              title: "Maps",
            }}
            component={Map}
          />
          
          <Stack.Screen
            name="placeDetails"
            options={{
              title: "Loading Place...",
            }}
            component={PlaceDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addPlacebtn: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    padding: 4,
    color: Colors.accent500,
    backgroundColor: Colors.gray700,
  },
});
