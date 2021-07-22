import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { useNavigation } from "@react-navigation/core";
import { ThemeContext } from "../theme/ThemeContext";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import Stonker from "../components/Stonker";
import { Feather } from "@expo/vector-icons";

function ProfileScreen() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const { dark, theme } = useContext(ThemeContext);
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [useDefault, setUseDefault] = useState(false);
  const [username, setUsername] = useState("default");
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(undefined);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      userTasks
        .get()
        .then((doc) => {
          setUsername(doc.data().username);
          setBio(doc.data().bio);
          if (doc.data().targetWorkRange !== undefined) {
            setTarget(doc.data().targetWorkRange);
          }
        })
        .then(() => {
          setLoading(false);
        });
    });

    return unsubscribe;
  }, [navigation]);

  function goToSettings() {
    navigation.navigate("Settings");
  }

  function renderImage() {
    fetch(currentUser.photoURL)
      .then((res) => {
        if (res.status == 200) {
          setUseDefault(false);
        }
      })
      .catch((error) => {
        setUseDefault(true);
      });
    return useDefault ? (
      <Image
        style={styles.img}
        source={require("../../assets/defaultProfile.png")}
      />
    ) : (
      <Image
        style={styles.img}
        source={{ uri: currentUser.photoURL }}
        onError={(e) => {
          setUseDefault(true);
        }}
      />
    );
  }

  const styles = {
    container: {
      alignItems: "center",
      flex: 1,
      marginTop: 50,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    profile: {
      alignItems: "center",
    },
    bio: {
      fontSize: 30,
      fontStyle:'italic',
      color: theme.color
    },
    displayName: {
      fontSize: 45,
      fontWeight: "600",
      color: theme.color
    },
    imgContainer: {
      backgroundColor: "white",
      width: 200,
      height: 200,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      borderRadius: 200,
      marginTop: 10,
      marginBottom: 10,
    },
    img: {
      width: 200,
      height: 200,
    },
    creds: {
      fontWeight: "300",
      color: "gray",
      fontSize: 20,
    },
    target: {
      fontSize: 16,
      fontWeight: "300",
      color: theme.color
    },
  };
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 48, fontWeight: "700", color: theme.color }}>Profile</Text>
          <Pressable onPress={goToSettings}>
            <Feather name="edit-3" size={35} color="gray" />
          </Pressable>
        </View>

        {loading || (
          <View style={styles.profile}>
            <View style={styles.imgContainer}>{renderImage()}</View>
            <Text style={styles.bio}>"{bio}"</Text>
            <Text style={styles.displayName}>{currentUser.displayName}</Text>
            <Text style={styles.creds}>Un: {username}</Text>
            <Text style={styles.creds}>Email: {currentUser.email}</Text>
            {target === undefined ? (
              <Text style={styles.target}>
                No target set yet, set one in the settings page!
              </Text>
            ) : (
              <View style={{ marginTop: 8 }}>
                <Text style={styles.target}>
                  Target Work: {target[0]}%-{target[1]}%
                </Text>
                <Text style={styles.target}>
                  Target Play: {100 - target[1]}%-{100 - target[0]}%
                </Text>
              </View>
            )}
          </View>
        )}
        <Stonker />
      </View>
    </ScrollView>
  );
}

export default ProfileScreen;
