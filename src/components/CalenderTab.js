import React, { useEffect, useState } from "react";
import { Agenda } from "react-native-calendars";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import CalendarItem from "./CalendarItem";
import moment from "moment";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
  Alert,
} from "react-native";

function CalenderTab(props) {
  const { tasks } = props; 
  const [items, setItems] = useState({});
  const [triggerLoad, setTriggerLoad] = useState(moment().format("YYYY-MM-DD"));
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);

  useEffect(() => {
    loadOnMonth(triggerLoad);
  }, [tasks, triggerLoad]);

  //   Object {
  //     "dateString": "2021-05-19",
  //     "day": 19,
  //     "month": 5,
  //     "timestamp": 1621382400000,
  //     "year": 2021,
  //   }
  // function deleteTask(task) {
  //   //delete task from database
  //   userTasks.collection(task.date).doc(task.id).delete();
  //   setTriggerLoad(task.date); //visible lag in rerendering
  //   //update work/life time in database
  //   const isWork = task.isWork;
  //   const dur = task.dur;

  //   const whatday = moment().day() === 0 ? 7 : moment().day(); // 1,2,3,4....7
  //   const numDays = whatday - 1; // num of times to mathfloor
  //   const monDate = moment().subtract(numDays, "days");

  //   if (moment(task.date, "YYYY-MM-DD").diff(monDate, "days") < 6) {
  //     userTasks.get().then((doc) => {
  //       if (isWork) {
  //         const currWork = doc.data().workTime;
  //         userTasks.update({
  //           workTime: currWork - dur,
  //         });
  //       } else {
  //         const currLife = doc.data().lifeTime;
  //         userTasks.update({
  //           lifeTime: currLife - dur,
  //         });
  //       }
  //     });
  //   }
  // }

  // function convertTime(num) {
  //   const s = parseFloat(num).toFixed(2).toString();
  //   const split = s.split(".");
  //   if (split[0] < 10) {
  //     return "0" + split[0] + ":" + split[1];
  //   } else {
  //     return split[0] + ":" + split[1];
  //   }
  // }

  async function loadOnMonth(date) {
    for (let i = -10; i < 10; i++) {
      const tempDate = moment(date).subtract(i, "days").format("YYYY-MM-DD");

      await userTasks
        .collection(tempDate)
        .get()
        .then((sub) => {
          if (sub.docs.length > 0) {
            // if (!items[tempDate]) {
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
            // }
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
      // <TouchableOpacity
      //   style={{
      //     flex: 1,
      //     height: 70,
      //     marginTop: 30,
      //     marginRight: 10,
      //     marginBottom: 20,
      //     padding: 10,
      //     borderRadius: 5,
      //   }}
      // >
      //   <Text style={{ fontSize: 20, fontWeight: "bold" }}>
      //     {convertTime(item.time)}
      //     {"-"}
      //     {convertTime(item.time + item.dur)}
      //   </Text>
      //   <Text style={{ fontSize: 17 }}>{item.name}</Text>
      //   <Pressable
      //     onPress={() => {
      //       deleteTask(item);
      //       Alert.alert("Are you sure you want to delete?");
      //     }}
      //   >
      //     <Text>Delete</Text>
      //   </Pressable>
      //   <Text style={{ fontSize: 14 }}>{item.desc}</Text>
      //   <Text>{item.isWork ? "WORK" : "PLAY"}</Text>
      // </TouchableOpacity>
      <>
        <CalendarItem item={item} selectedDate={item.date} setTriggerLoad={setTriggerLoad}/>
      </>
    );
  };

  function renderEmptyDate() {
    return (
      <View
        style={{
          height: 15,
          paddingLeft: 10,
          marginTop: 28,
          flex: 1,
          justifyContent: "center",
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight:'300' }}>No tasks for the day!</Text>
      </View>
    );
  }

  return (
    <Agenda
      style={styles.container}
      theme={styles.theme}
      items={items}
      loadItemsForMonth={(day) => loadOnMonth(day.dateString)}
      renderItem={(item, firstItemInDay) => {
        return renderItem(item);
      }}
      selected={moment().format("YYYY-MM-DD")}
      renderEmptyDate={renderEmptyDate}
    />
  );
}

export default CalenderTab;

const styles = {
  container: {
    marginTop: 50,
  }, 
  theme: {
    agendaDayTextColor: 'grey',
    agendaDayNumColor: 'grey',
    agendaTodayColor: 'black',
    agendaKnobColor: 'turquoise',
    dotColor: 'turquoise',
    selectedDotColor: 'turquoise',
    selectedDayTextColor: '#ffffff',
    todayTextColor: 'turquoise',
    selectedDayBackgroundColor: 'gray',
  }
}