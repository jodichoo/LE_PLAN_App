import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../navigation/AuthProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = (props) => {
  const { currentUser, logout } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default AppStack;
