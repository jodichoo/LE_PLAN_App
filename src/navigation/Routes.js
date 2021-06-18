import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import '@firebase/auth';
import {AuthContext} from './AuthProvider';
import firebase from 'firebase/app'
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

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
    <NavigationContainer>
      {currentUser ? <AppStack name="user"/> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;