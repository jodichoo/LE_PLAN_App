import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FriendProfile from "../screens/FriendProfile";
import { ThemeContext } from "../theme/ThemeContext";
import { Text, Image, Switch } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const AppStack = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const [def, setDef] = useState(false);
  const { dark, theme, toggle } = useContext(ThemeContext);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
      >
        <DrawerContentScrollView>
          {def ? (
            <DrawerItem
              label={() => (
                <Image
                  style={{ width: 220, height: 220, borderRadius: 110 }}
                  source={require("../../assets/defaultProfile.png")}
                />
              )}
              style={{ marginTop: -260 }}
            />
          ) : (
            <DrawerItem
              label={() => (
                <Image
                  style={{ width: 220, height: 220, borderRadius: 110 }}
                  source={{ uri: currentUser.photoURL }}
                  onError={(e) => setDef(true)}
                />
              )}
            />
          )}
          <DrawerItemList {...props} />
          <DrawerItem
            label={() => (
              <DrawerContentScrollView contentContainerStyle={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
              <Text style={{color: theme.color}}>Dark Mode</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={dark ? "whitesmoke" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggle}
                value={dark}
              />
              </DrawerContentScrollView>
            )}
          />
        </DrawerContentScrollView>

        <DrawerItem
          label={() => <Text style={{ color: "white" }}>Logout</Text>}
          style={{ backgroundColor: "red", marginBottom: 10 }}
          onPress={logout}
        />
      </DrawerContentScrollView>
    );
  }

  function DrawerStack() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Settings">
          {(props) => <SettingsScreen {...props} setDef={setDef} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={DrawerStack} />
      <Stack.Screen name="FriendProfile" component={FriendProfile} />
    </Stack.Navigator>
  );
};

export default AppStack;
