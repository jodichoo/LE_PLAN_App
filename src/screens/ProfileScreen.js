import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { Text, TouchableOpacity, View } from "react-native";

function ProfileScreen() {
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [dataSet, setDataSet] = useState([]);
  const [workSet, setWorkSet] = useState([]);
  const [playSet, setPlaySet] = useState([]);

  useEffect(() => {
    userTasks
      .get()
      .then((doc) => {
        const temp = doc.data().stonksData;
        const arr = [];

        for (var i = 0; i < temp.length; i++) {
          arr.push(temp[i]);
        }

        const workCount = doc.data().workTime;
        const lifeCount = doc.data().lifeTime;
        const dataItem =
          workCount === 0 && lifeCount === 0
            ? -1
            : (100 * parseFloat(workCount)) /
              (parseFloat(workCount) + parseFloat(lifeCount));

        arr.push(Math.round(dataItem * 100) / 100);
        setDataSet(arr);
      })
      .then(() => {
        setWorkSet(convertToWork());
        setPlaySet(convertToPlay());
      });
  }, []);

  function convertToWork() {
    const arr = dataSet;
    const converted = [];

    for (var i = 0; i < dataSet.length; i++) {
      if (arr[i] < 0) {
        converted.push(0);
      } else {
        converted.push(arr[i]);
      }
    }

    return converted;
  }

  function convertToPlay() {
    const arr = dataSet;
    const converted = [];

    for (var i = 0; i < dataSet.length; i++) {
      const curr = arr[i];
      if (curr === -1) {
        converted.push(0);
      } else {
        const n = 100 - parseFloat(curr);
        converted.push(Math.round(n * 100) / 100);
      }
    }
    
    return converted;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Profile</Text>
    </View>
  );
}

export default ProfileScreen;
