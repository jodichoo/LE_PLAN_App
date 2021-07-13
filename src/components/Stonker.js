import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function Stonker() {
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [workSet, setWorkSet] = useState([]);
  const [playSet, setPlaySet] = useState([]);
  const [dataSet, setDataSet] = useState([-1,-1,-1,-1,-1]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  function convertToWork(arr) {
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

  function convertToPlay(arr) {
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
    <View>
      {loading || (
        <LineChart
          data={{
            labels: ["", "", "", "", "this week"],
            datasets: [
              {
                data: convertToWork(dataSet)
              },
              {
                data: convertToPlay(dataSet)
              }
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="%"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
}

export default Stonker;
