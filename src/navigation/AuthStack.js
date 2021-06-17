import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Registration" headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
