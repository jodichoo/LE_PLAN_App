import React from "react";
import Providers from "./src/navigation";
import { LogBox } from "react-native";
import { ThemeProvider } from "./src/theme/ThemeContext";

const App = () => {
  LogBox.ignoreLogs(["Setting a timer"]);
  
  return (
    <ThemeProvider>
      <Providers />
    </ThemeProvider>
  );
};

export default App;
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
