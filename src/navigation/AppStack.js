import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFocusEffect } from '@react-navigation/native';
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const AppStack = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const [useDefault, setUseDefault] = useState(false);

  // useFocusEffect(() => {
  //   setUseDefault(false);
  // },[])

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      >
        <DrawerContentScrollView>
          <DrawerItem
            label={() => (
              <Image
                style={{ width: 220, height: 220, borderRadius: 110 }}
                source={{ uri: currentUser.photoURL }}
                onError={(e) => setUseDefault(true)}
              />
            )}
          />
          {useDefault && <DrawerItem
            label={() => (
              <Image
                style={{ width: 220, height: 220, borderRadius: 110 }}
                source={require('../../assets/defaultProfile.png')}
              />
              
            )}
            style={{marginTop: -260}}
          />}
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        <DrawerItem
          label={() => <Text style={{ color: "white" }}>Logout</Text>}
          style={{ backgroundColor: "red", marginBottom: 10 }}
          onPress={logout}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default AppStack;
