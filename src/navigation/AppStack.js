import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
const AppStack = () => {
  const { logout } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <DrawerContentScrollView>
        <DrawerItem label={() => <Text style={{ color: 'white', height: 200 }}>Profile image, square</Text>}
          style={{backgroundColor: 'gray', marginTop: 20}} 
        />
        <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <DrawerItem label={() => <Text style={{ color: 'white' }}>Logout</Text>}
          style={{backgroundColor: 'red', marginBottom: 10}} 
          onPress={logout}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default AppStack;
