import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { ThemeContext } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";

function FriendsTab() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const { dark, theme } = useContext(ThemeContext);
  const [friendsUn, setFriendsUn] = useState("");
  const [error, setError] = useState("");
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [currUn, setCurrUn] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [addFriends, setAddFriends] = useState(false);
  const [friendData, setFriendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      userTasks.get().then((doc) => {
        setCurrUn(doc.data().username);
        setFriendsList(doc.data().friends);
      });
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    //to account for all friends deleted and force rerendering of friends board
    if (friendsList.length == 0) {
      setLoading(true);
      setFriendData([]);
      setLoading(false);
    }

    const dataList = [];
    for (var i = 0; i < friendsList.length; i++) {
      const name = friendsList[i];
      db.collection("users")
        .where("username", "==", name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            dataList.push({
              friend: name,
              work: doc.data().workTime,
              play: doc.data().lifeTime,
            });
          });
        })
        .then(() => {
          setLoading(true);
          setFriendData(dataList);
          // console.log(dataList);
        })
        .then(() => setLoading(false));
    }
  }, [friendsList]);

  function handleAddFriend(e) {
    e.preventDefault();
    if (friendsUn.trim().length === 0) {
      return setError("Please enter a username");
    } else if (friendsUn === currUn) {
      return setError("You are not your own friend >_<");
    } else if (friendsList.includes(friendsUn)) {
      return setError("This person is already your friend :)");
    } else {
      setError("");
      db.collection("usernames")
        .doc(friendsUn)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //friend exists
            const currFriends = friendsList;
            const newList = currFriends.concat(friendsUn);
            userTasks
              .update({
                friends: newList,
              })
              .then(() => {
                setFriendsList(newList);
                setAddFriends(false);
              });
            return setError("");
          } else {
            //friend does not exist
            return setError("Friend does not exist!");
          }
        });
    }
  }

  function renderMeter(w, p) {
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
      },

      wrapper: {
        flex: 0.6,
        flexDirection: "row",
        width: "100%",
        borderWidth: 2,
        borderColor: theme.color,
        borderStyle: "solid",
      },

      emptyWrapper: {
        width: "100%",
        flex: 0.6,
        borderWidth: 2,
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
    });

    return w === 0 && p === 0 ? (
      <>
        <View style={styles.emptyWrapper}>
          <Text>No tasks for the week!</Text>
        </View>
      </>
    ) : (
      <>
        {console.log(wFlex, pFlex)}
        <View style={styles.wrapper}>
          <View style={styles.work}></View>
          <View style={styles.play}></View>
        </View>
      </>
    );
  }

  function goToFriendProfile(friendUn) {
    // navigation + pass props into route
    return navigation.navigate("FriendProfile", {
      friendUn: friendUn,
      friendsList: friendsList,
    });
  }

  function renderFriend(friendObj) {
    return (
      <TouchableOpacity
        key={friendObj.friend}
        style={styles.friend}
        onPress={() => goToFriendProfile(friendObj.friend)}
      >
        <Text style={{ fontSize: 18, fontWeight: "300", flex: 0.4, color:theme.color }}>
          {friendObj.friend}
        </Text>
        {renderMeter(friendObj.work, friendObj.play)}
      </TouchableOpacity>
    );
  }

  function showAddFriend() {
    setAddFriends(!addFriends);
    setError("");
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 50,
      flexDirection: "column",
    },
  
    text: {
      fontSize: 16,
      fontWeight: "500",
    },
  
    input: {
      backgroundColor: "#ededed",
      width: "90%",
      paddingHorizontal: 10,
      height: 30,
      borderRadius: 10,
      borderColor: "black",
      borderStyle: "solid",
      borderWidth: 1,
    },
    
    addFriend: {
      flexDirection: "column",
      alignItems: "center",
      width: "90%",
      marginHorizontal: 20,
    },
  
    addFriendBut: {
      marginVertical: 10,
      paddingHorizontal: 15,
      paddingVertical: 8,
      backgroundColor: "turquoise",
      borderRadius: 16,
      borderWidth: dark ? 4 : 3,
      borderColor: theme.color,
      borderStyle: "solid",
    },
  
    err: {
      fontSize: 18,
      fontWeight: "bold",
      paddingVertical: 5,
      color: "pink",
    },
  
    board: {
      alignItems: "center",
      marginBottom: 30,
      borderStyle: "solid",
      borderColor: theme.color,
      borderWidth: dark ? 4 : 3,
      padding: 10,
      borderRadius: 10,
      width: "90%",
      flex: 1,
    },
  
    friend: {
      flexDirection: "row",
      marginVertical: 5,
    },
  });

  return (
    <View style={styles.container}>
      {/* <button onClick={showAddFriend}>+ Add Friends</button> */}

      {/* <HiUserAdd style={{ color: "whitesmoke", fontSize: "20px" }} /> */}
      <Pressable style={styles.addFriendBut} onPress={showAddFriend}>
        <Text style={{ fontSize: 28, fontWeight: "600" }}>Add Friends</Text>
      </Pressable>

      {addFriends && (
        <View style={styles.addFriend}>
          {error.length > 0 && <Text style={styles.err}>{error}</Text>}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.75, alignItems: "center" }}>
              <Text style={styles.text}>Your Friend's Username: </Text>
              <TextInput
                style={styles.input}
                onChangeText={(e) => setFriendsUn(e)}
              />
            </View>
            <View style={{ flex: 0.25 }}>
              <Pressable style={styles.addFriendBut} onPress={handleAddFriend}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    alignSelf: "center",
                  }}
                >
                  Add
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View style={styles.board}>
        <Text
          style={{ fontSize: 48, fontWeight: "700", alignSelf: "flex-start", color: theme.color }}
        >
          Friends:{" "}
        </Text>
        <View style={{ flex: 1, width: "96%" }}>
          {friendData.length === 0 ? (
            <Text style={{ fontSize: 20, color: theme.color }}>You have no friends :(</Text>
          ) : (
            loading || friendData.map(renderFriend)
          )}
        </View>
      </View>
    </View>
  );
}

export default FriendsTab;
