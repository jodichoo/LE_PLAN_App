import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import { Text, View, Pressable, StyleSheet, Image } from "react-native";

function FriendProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack } = navigation;
  const { currentUser } = useAuth();
  const friendUsername = route.params.friendUn;
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [photoUrl, setPhotoUrl] = useState("");
  const [useDefault, setUseDefault] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
    db.collection("users")
      .where("username", "==", friendUsername)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setDisplayName(doc.data().displayName);
          setPhotoUrl(doc.data().photoURL);
          setFriendsList(doc.data().friends);
        });
      });
  });

  function handleDeleteFriend() {
    const toDelete = friendUsername;
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

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => goBack()}>
        <Text>Back</Text>
      </Pressable>
      <Text>{displayName}</Text>
      {!useDefault && (
        <Image
          style={styles.imgDef}
          source={{ uri: photoUrl }}
          onError={(e) => {
            setUseDefault(true);
          }}
        />
      )}
      {useDefault && (
        <Image
          style={styles.imgDef}
          source={require("../../assets/defaultProfile.png")}
        />
      )}
      <Text>
        {displayName}'s Username: {friendUsername}
      </Text>
      <Text>Bio: poopy loopy</Text>
      <Pressable style={styles.remove} onPress={handleDeleteFriend}>
        <Text style={styles.del}>Remove 'Friend name' இдஇ</Text>
      </Pressable>
    </View>
  );
}

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 110,
  },
  back: {
    padding: 20,
    backgroundColor: "turquoise",
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: -80,
  },
  imgDef: {
    width: 200,
    height: 200,
  },
  remove: {
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
  },
  del: {
    color: "red",
  },
});
