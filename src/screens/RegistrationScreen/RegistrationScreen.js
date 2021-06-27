import { firebase } from "../../firebase/config";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../navigation/AuthProvider";
import { db } from "../../firebase/config";

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useContext(AuthContext);
  const [error, setError] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  function checkUsername() {
    if (username.trim().length === 0) {
      return setError("Please enter a username");
    } else {
      setError("");
      db.collection("usernames")
        .doc(username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("un taken");
            return setError("Username has been taken!");
          }
        });
    }
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <Text>{error && <Text>{error}</Text>}</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUsername(text)}
          value={username}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={checkUsername}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => register(email, password, username, fullName)}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegistrationScreen;

// export default function RegistrationScreen({navigation}) {
//     const [fullName, setFullName] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [confirmPassword, setConfirmPassword] = useState('')

//     const onFooterLinkPress = () => {
//         navigation.navigate('Login')
//     }

//     const onRegisterPress = () => {
//         if (password !== confirmPassword) {
//             alert("Passwords don't match.")
//             return
//         }
//         firebase
//             .auth()
//             .createUserWithEmailAndPassword(email, password)
//             .then((response) => {
//                 const uid = response.user.uid
//                 const data = {
//                     id: uid,
//                     email,
//                     fullName,
//                 };
//                 const usersRef = firebase.firestore().collection('users')
//                 usersRef
//                     .doc(uid)
//                     .set(data)
//                     .then(() => {
//                         navigation.navigate('Home', {user:data})
//                     })
//                     .catch((error) => {
//                         alert(error)
//                     });
//             })
//             .catch((error) => {
//                 alert(error)
//         });
//     }
// }
