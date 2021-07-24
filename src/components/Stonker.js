import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { ThemeContext } from "../theme/ThemeContext";

function Stonker() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [dataSet, setDataSet] = useState([-1, -1, -1, -1, -1]);
  const [loading, setLoading] = useState(true);

  function setData() {
    userTasks
      .get()
      .then((doc) => {
        setLoading(true);
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
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", setData);

    return unsubscribe;
  }, [navigation, theme]);

  useEffect(() => {
    setData(); 
  }, [theme])

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

  return (
    <View style={styles.stonks}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "700",
          alignSelf: "flex-start",
          color: theme.color,
          textDecorationLine: "underline",
          marginBottom: 10,
        }}
      >
        Progress Chart
      </Text>
      {/* <Text style={{ fontSize: 15, color: "gray" }}>
        Track your progress through the weeks and plan ahead to manage your time
        and reach your goals :)
      </Text> */}
      {loading || (
        <LineChart
          data={{
            labels: ["One month ago", "", "", "", "This week"],
            datasets: [
              {
                data: convertToWork(dataSet),
                name: "Work",
                color: (opacity = 1) => `rgba(255, 192, 203, ${opacity})`,
              },
            ],
          }}
          width={Dimensions.get("window").width * 0.88} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="%"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#000000",
            backgroundGradientTo: "#000000",
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "0.5",
              stroke: "#000000",
            },
            propsForLabels: {
              fontWeight: "600",
            },
          }}
          bezier
          style={{
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 2,
            marginVertical: 8,
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 3,
            backgroundColor: "black",
          }}
        />
      )}
      <Text style={{ fontSize: 13, color: "gray" }}>
        *This chart shows the percentage of{" "}
        <Text style={{ fontWeight: "bold" }}>work</Text> you did relative to all
        the time you've spent on each event!
      </Text>
    </View>
  );
}

export default Stonker;

const styles = {
  stonks: {
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
    flex: 1,
  },
};
