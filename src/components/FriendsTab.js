import React, { useState, useEffect } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import {
    StyleSheet,
    FlatList,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Button,
    Modal,
    Pressable,
  } from "react-native";
  
function FriendsTab() {
  const { currentUser } = useAuth();
  const [friendsUn, setFriendsUn] = useState("");
  const [error, setError] = useState("");
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [currUn, setCurrUn] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [addFriends, setAddFriends] = useState(false);
  const [friendData, setFriendData] = useState([]);

  useEffect(() => {
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
          setFriendData(dataList);
        });
    }
  }, [friendsList]);

  useEffect(() => {
    userTasks.get().then((doc) => {
      setCurrUn(doc.data().username);
      setFriendsList(doc.data().friends);
    });
  }, []);

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
    const wFlex = p === 0 ? 100 : (w * 100) / p + w;
    const pFlex = w === 0 ? 100 : (p * 100) / p + w;

    const styles = StyleSheet.create({
      // wrapper: {
      //   display: "flex",
      //   flexDirection: "row",
      //   width: "100%",
      //   border: "1px solid whitesmoke",
      // },

      // work: {
      //   color: "red",
      //   height: "100%",
      //   flex: `${wFlex}%`,
      //   backgroundColor: "red",
      // },

      // play: {
      //   color: "green",
      //   height: "100%",
      //   flex: `${pFlex}%`,
      //   backgroundColor: "green",
      // },
    });

    return w === 0 && p === 0 ? (
      <Text>Noobie</Text>
    ) : w === 0 ? (
      <View styles={styles.wrapper}>
        <Text style={styles.play}>p</Text>
      </View>
    ) : p === 0 ? (
      <View style={styles.wrapper}>
        <Text style={styles.work}>w</Text>
      </View>
    ) : (
      <View style={styles.wrapper}>
        <Text style={styles.work}>w</Text>
        <Text style={styles.play}>p</Text>
      </View>
    );
  }

  function renderFriend(friendObj) {
    return (
      <View>
        <Text style={{fontSize: 15, color: "whitesmoke"}}>
          {friendObj.friend} 
        </Text>
        {renderMeter(friendObj.work, friendObj.play)}
      </View>
    );
  }

  function showAddFriend() {
    setAddFriends(!addFriends);
    setError("")
  }

  return (
    <View style={styles.container}>
      {/* <button onClick={showAddFriend}>+ Add Friends</button> */}
      
        {/* <HiUserAdd style={{ color: "whitesmoke", fontSize: "20px" }} /> */}
        <Pressable style={styles.addFriendBut} onPress={showAddFriend}><Text style={{fontSize: 20, color: "whitesmoke"}}>Add Friends</Text></Pressable>
      

      {addFriends && (
        <View style={styles.addFriend}>
          <Text style={styles.err}>{error && <Text>{error}</Text>}</Text>
          <Text style={{}}>Your Friend's Username: </Text>
          <TextInput style={{backgroundColor: '#ededed'}}
          onChangeText={(e) => setFriendsUn(e)}
        />
          <Pressable style={styles.addFriendBut} onPress={handleAddFriend}><Text style={{fontSize: 20, color: "whitesmoke", alignSelf:"center"}}>Add</Text></Pressable>
        </View>
      )}

      <View style={styles.board}>
        <Text style={{fontSize: 23, color: "whitesmoke", marginBottom: 10}}>Friends: </Text>
        {friendData.length === 0 ? (
          <Text style={{fontSize: 20, color: "whitesmoke"}}>You have no friends :(</Text>
        ) : (
          friendData.map(renderFriend)
        )}
      </View>
    </View>
  );
}

export default FriendsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },

  addFriend: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "turquoise",
    borderRadius: 10,
  },

  addFriendBut: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "turquoise",
    borderRadius: 10,
  },

  err: {
    fontWeight: 'bold',
    padding: 10,
    color: "red"
  },

  board: {
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "#000000aa",
    padding: 10,
    borderRadius: 10,
    width: 100,
    height: 100,
    
  }
});