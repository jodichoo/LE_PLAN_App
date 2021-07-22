import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import "@firebase/auth";
import { AuthContext } from "./AuthProvider";
import firebase from "firebase/app";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { ThemeContext } from "../theme/ThemeContext";

const Routes = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const { dark, theme, toggle } = useContext(ThemeContext);

  const onAuthStateChanged = (user) => {
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={dark ? DarkTheme : DefaultTheme}>
      {currentUser ? <AppStack name="user" /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
