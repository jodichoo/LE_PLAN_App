import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { db } from "../firebase/config";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import FriendProfile from "../screens/FriendProfile";
import OnboardingScreen from "../screens/OnboardingScreen";
import { ThemeContext } from "../theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Text, Image, Switch } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const AppStack = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const userTasks = db.collection("users").doc(currentUser.uid);
  const { dark, theme, toggle, toggleDark } = useContext(ThemeContext);
  const [def, setDef] = useState(false);
  const [isFirstMobileLogin, setIsFirstMobileLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  useEffect(() => {
    console.log("get theme");
    userTasks
      .get()
      .then((doc) => {
        toggleDark(doc.data().dark);
        setIsFirstMobileLogin(doc.data().firstMobileLogin);
      })
      .then(setLoading(false));
  }, []);

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
              <DrawerContentScrollView
                contentContainerStyle={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: theme.color, fontWeight: "600" }}>
                  Dark Mode{" "}
                </Text>
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
          label={() => (
            <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
              Logout
            </Text>
          )}
          style={{
            backgroundColor: dark ? "#8B0000" : "crimson",
            marginBottom: 30,
          }}
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
        drawerContentOptions={{
          activeTintColor: "#00CED1",
        }}
      >
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="person-outline"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="settings-outline"
                size={size}
                color={focused ? "#7cc" : "#ccc"}
              />
            ),
          }}
        >
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
      {loading || isFirstMobileLogin ? (
        <Stack.Screen name="Home" children={()=>{
    return (
      <OnboardingScreen isFirstMobileLogin={isFirstMobileLogin} setIsFirstMobileLogin={setIsFirstMobileLogin} />
    )
   }}/>
      ) : (
        <Stack.Screen name="Home" component={DrawerStack} />
      )}
      <Stack.Screen name="FriendProfile" component={FriendProfile} />
    </Stack.Navigator>
  );
};

export default AppStack;
