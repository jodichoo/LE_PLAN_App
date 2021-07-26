import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import { ThemeContext } from "../theme/ThemeContext";
import { Text, View, Pressable, StyleSheet, Image } from "react-native";
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

function FriendProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack } = navigation;
  const { currentUser } = useAuth();
  const { theme } = useContext(ThemeContext);
  const friendUsername = route.params.friendUn;
  const w = route.params.w;
  const p = route.params.p;
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [photoUrl, setPhotoUrl] = useState(".jpg");
  const [useDefault, setUseDefault] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("users")
      .where("username", "==", friendUsername)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDisplayName(doc.data().displayName);
          setPhotoUrl(doc.data().photoURL);
          setBio(doc.data().bio);
        });
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  function renderImage() {
    fetch(photoUrl)
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
        source={{ uri: photoUrl }}
        onError={(e) => {
          setUseDefault(true);
        }}
      />
    );
  }

  function renderMeter() {
    const wFlex = p === 0 ? 1 : w / (p + w);
    const pFlex = w === 0 ? 1 : p / (p + w);

    const styles = StyleSheet.create({
      container: {
        height: "8%",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        marginTop: 5,
      },

      wrapper: {
        flex: 0.6,
        flexDirection: "row",
        width: "100%",
        borderWidth: 3,
        borderColor: theme.color,
        borderStyle: "solid",
      },

      emptyWrapper: {
        width: "100%",
        flex: 0.6,
        borderWidth: 3,
        borderColor: theme.color,
        borderStyle: "solid",
        alignItems: "center",
        justifyContent: "center",
      },

      work: {
        flex: wFlex,
        backgroundColor: "pink",
      },

      play: {
        flex: pFlex,
        backgroundColor: "turquoise",
      },

      data: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
      },
      text: {
        color: theme.color,
        fontWeight: "500"
      }
    });

    return w === 0 && p === 0 ? (
      <View style={{ height: 40, marginTop: 20, width: 280 }}>
        <View style={styles.emptyWrapper}>
          <Text style={styles.text}>No tasks for the week!</Text>
        </View>
      </View>
    ) : (
      <View>
        <View style={styles.data}>
          <Octicons name="briefcase" size={20} color="pink" />
          <Text style={styles.text}>{" "}Work: {(wFlex * 100).toFixed(1)}%{"     "}</Text>
          <MaterialCommunityIcons
            name="gamepad-variant"
            size={23}
            color="turquoise"
          />
          <Text style={styles.text}>{" "}Play: {(pFlex * 100).toFixed(1)}%</Text>
        </View>
        <View style={{ height: 35, marginTop: 10 }}>
          <View style={styles.wrapper}>
            <View style={styles.work}></View>
            <View style={styles.play}></View>
          </View>
        </View>
      </View>
    );
  }

  function handleDeleteFriend() {
    const toDelete = friendUsername;
    const friendsList = route.params.friendsList;
    const index = friendsList.findIndex((element) => element === toDelete);
    const newList = [
      ...friendsList.slice(0, index),
      ...friendsList.slice(index + 1),
    ];
    userTasks
      .update({
        friends: newList,
      })
      .then(() => {
        goBack();
      });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 40,
    },
    back: {
      position: "absolute",
      top: 4,
      alignSelf: "flex-start",
    },
    profile: {
      marginTop: 40,
      flex: 1,
      alignItems: "center",
    },
    displayName: {
      fontSize: 50,
      fontWeight: "600",
      color: theme.color,
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
      marginBottom: 20,
    },
    img: {
      width: 200,
      height: 200,
    },
    un: {
      fontWeight: "300",
      color: "gray",
      fontSize: 20,
      marginTop: 10
    },
    bio: {
      marginTop: -5,
      fontSize: 30,
      fontStyle: "italic",
      color: theme.color,
    },
    remove: {
      marginTop: 20,
      backgroundColor: "pink",
      padding: 10,
      borderRadius: 10,
    },
    del: {
      color: "crimson",
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => goBack()}>
        <Ionicons name="chevron-back-outline" size={60} color={theme.color} />
      </Pressable>

      <View style={styles.profile}>
        <Text style={styles.displayName}>{displayName}</Text>

        <View style={styles.imgContainer}>{loading || renderImage()}</View>

        <Text style={styles.bio}>"{bio}"</Text>

        <Text style={styles.un}>
          {displayName}'s username: {friendUsername}
        </Text>
        {renderMeter()}
        <Pressable style={styles.remove} onPress={handleDeleteFriend}>
          <Text style={styles.del}>Remove {displayName} இдஇ</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default FriendProfile;
