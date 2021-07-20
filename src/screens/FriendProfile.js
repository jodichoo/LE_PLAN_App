import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Pressable, StyleSheet, Image } from "react-native";

function FriendProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack } = navigation;
  const { currentUser } = useAuth();
  const friendUsername = route.params.friendUn;
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

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => goBack()}>
        {/* <Text style={{color: 'whitesmoke'}}>Back</Text> */}
        <Ionicons name="chevron-back-outline" size={60} color="black" />
      </Pressable>

      <View style={styles.profile}>
        <Text style={styles.displayName}>{displayName}</Text>

        <View style={styles.imgContainer}>
          {loading || renderImage()}
        </View>

        <Text style={styles.bio}>"{bio}"</Text>

        <Text style={styles.un}>
          {displayName}'s username: {friendUsername}
        </Text>

        <Pressable style={styles.remove} onPress={handleDeleteFriend}>
          <Text style={styles.del}>Remove {displayName} இдஇ</Text>
        </Pressable>
      </View>
      
    </View>
  );
}

export default FriendProfile;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'red',
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
  back: {
    position: 'absolute', 
    top: 4,
    alignSelf: "flex-start",
  },
  profile: {
    marginTop: 40,
    // backgroundColor: 'grey',
    flex: 1, 
    alignItems: 'center',
  },
  displayName: {
    fontSize: 50,
    fontWeight: '600'
  },  
  imgContainer: {
    backgroundColor: 'white',
    width: 200, 
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  img: {
    width: 200,
    height: 200,
  },
  un: {
    fontWeight: '300',
    color: 'gray',
    fontSize: 20,
  }, 
  bio: {
    marginTop: -5,
    fontSize: 30,
    fontStyle: 'italic',
  },
  remove: {
    marginTop: 30,
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
  },
  del: {
    color: "red",
  },
});
