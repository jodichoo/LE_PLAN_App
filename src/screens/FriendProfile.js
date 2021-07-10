import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { db } from "../firebase/config";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image
} from "react-native";

function FriendProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { goBack } = navigation;
  const friendUsername = route.params.friendUn;
  const userTasks = db.collection("users").doc(friendUsername);

  return (
    <View style={styles.container}>
      <Pressable style={styles.back} onPress={() => goBack()}>
        <Text>Back</Text>
      </Pressable>
      <Text>Display Name</Text>
      <Text>Friend's profile pic, put the facebook man for now</Text>
      <Image
        style={styles.imgDef}
        source={require('../../assets/defaultProfile.png')}
      />
      <Text>'Friend" Username: {friendUsername}</Text>
      <Text>Bio: poopy loopy</Text>
      <Pressable style={styles.remove}><Text style={styles.del}>Remove 'Friend name' இдஇ</Text></Pressable>
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
    alignSelf: 'flex-start',
    marginTop: -80
  },
  imgDef: {
      width: 200,
      height: 200
  },
  remove: {
      backgroundColor: 'pink',
      padding: 10,
      borderRadius: 10
  },
  del: {
      color: 'red'
  }
});
