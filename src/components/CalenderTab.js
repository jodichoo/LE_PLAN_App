import React, { useEffect, useState } from "react";
import { Calendar, Agenda } from "react-native-calendars";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";

function CalenderTab() {
  const [items, setItems] = useState({});
  const { currentUser, logout } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);

  //   Object {
  //     "dateString": "2021-05-19",
  //     "day": 19,
  //     "month": 5,
  //     "timestamp": 1621382400000,
  //     "year": 2021,
  //   }

  function convertTime(num) {
    const s = parseFloat(num).toFixed(2).toString();
    const split = s.split(".");
    if (split[0] < 10) {
      return "0" + split[0] + ":" + split[1];
    } else {
      return split[0] + ":" + split[1];
    }
  }

  async function loadOnMonth(day) {
    for (let i = -10; i < 10; i++) {
      const tempDate = moment(day.dateString)
        .subtract(i, "days")
        .format("YYYY-MM-DD");
      await userTasks
        .collection(tempDate)
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            if (!items[tempDate]) {
              const t = [];
              userTasks
                .collection(tempDate)
                .orderBy("time")
                .get()
                .then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                      t.push(doc.data());
                    }
                  });
                });
              items[tempDate] = t;
            }
          } else {
            items[tempDate] = [];
          }
        });
    }
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
  }

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 70,
          marginTop: 30,
          marginRight: 10,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {convertTime(item.time)}
          {"-"}
          {convertTime(item.time + item.dur)}
        </Text>
        <Text style={{fontSize: 17}}>{item.name}</Text>
        <Text style={{fontSize: 14}}>{item.desc}</Text>
        <Text>{item.isWork ? "WORK" : "PLAY"}</Text>
      </TouchableOpacity>
    );
  };

  function renderEmptyDate() {
    return (
      <View
        style={{
          height: 15,
          paddingTop: 30,
          marginTop: 10,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={{fontSize: 20}}>No tasks for the day!</Text>
      </View>
    );
  }

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadOnMonth}
      renderItem={(item, firstItemInDay) => {
        return renderItem(item);
      }}
      selected={moment().format("YYYY-MM-DD")}
      renderEmptyDate={renderEmptyDate}
    />
  );
}

export default CalenderTab;
