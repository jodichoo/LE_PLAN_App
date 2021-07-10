import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, TouchableOpacity, View, Pressable } from "react-native";

function FriendProfile() {
  const navigation = useNavigation();
  const { goBack } = navigation;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Friend's Profile</Text>
      <Pressable onPress={() => goBack()}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

export default FriendProfile;
