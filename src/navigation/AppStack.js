import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

const AppStack = (props) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Home'>
                {props => <HomeScreen {...props} extraData={props.name} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default AppStack;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }
//   })