import React, { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { AuthContext } from "../../navigation/AuthProvider";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  async function handleSubmit() {
    if (password.length < 6) {
      return setError("Password should be at least 6 characters long");
    }
    try {
      setError("");
      await login(email, password);
    } catch {
      setError("Failed to log in, please check your email and password");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/AuthBG.jpg")}
        resizeMode="cover"
        style={styles.bg}
      >
        <KeyboardAwareScrollView
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            source={require("../../../assets/logo.png")}
          />
          <Text style={styles.err}>{error && <Text>{error}</Text>}</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonTitle}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
}

export default LoginScreen;
