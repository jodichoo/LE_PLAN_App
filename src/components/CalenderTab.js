import React, { useEffect, useState } from "react";
import { Calendar, Agenda } from "react-native-calendars";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";
// function CalendarTab(props) {
//     const {navigation, selectedDate, setSelectedDate} = props;

//     function handleDay(day) {
//         console.log(day)
//         setSelectedDate(day.dateString);

//         navigation.navigate("TaskManager", {selectedDate})
//     }

//     return (
//         <Calendar
//             onDayPress={(day) => handleDay(day)}
//         />
//     )
// }

// export default CalendarTab;
function CalenderTab() {
  const [items, setItems] = useState({});
  const { currentUser, logout } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  //   Object {
  //     "dateString": "2021-05-19",
  //     "day": 19,
  //     "month": 5,
  //     "timestamp": 1621382400000,
  //     "year": 2021,
  //   }

  // useEffect (() => {
  //     const arr = [];
  //     const unsubscribe = userTasks.onSnapshot((querySnapshot) => {
  //         querySnapshot.forEach((col) => {
  //           col.orderBy("time").onSnapshot((querySnapshot) => {
  //               const t = [];
  //               querySnapshot.forEach((doc) => {
  //                   if (doc.exists) {
  //                 t.push(doc.data());
  //                   }
  //               });
  //               arr.push(t);
  //           });
  //        })
  //        setItems(arr);
  //        console.log(items)
  //   })
  //   return ()=> unsubscribe;
  // }, [])

const loadOnMonth = (day) => {
    
    setTimeout(() => {
    for (let i = -10; i < 10; i++) {
      const tempDate = moment(day.dateString)
        .subtract(i, "days")
        .format("YYYY-MM-DD");
        console.log(tempDate)
      userTasks
        .collection(tempDate)
        .get()
        .then((sub) => {
          // console.log(sub)
          if (sub.docs.length > 0) {
            if (!items[tempDate]) {
              items[tempDate] = [];
              userTasks
                .collection(tempDate)
                .orderBy("time")
                .onSnapshot((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    const t = doc.data();
                    console.log(t)
                    items[tempDate].push({
                      name: 'tom',
                    //   start: t.time,
                    //   end: t.dur + t.time,
                    //   desc: t.desc,
                    //   genre: t.isWork,
                    //   height: 100,
                    });
                  });
                });
            }
          }
          // } else {
          //     items[tempDate] = []
          // }
        });
    }
    const newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    setItems(newItems);
}, 1000);
    // console.log(items)
  }

  const loadItems = (day) => {

      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!items[strTime]) {
            items[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
              items[strTime].push({
                  duration: '',
                name: "Item for " + strTime + " #" + j,
                desc: '',
                isWork:'' ,
                height: Math.max(50, Math.floor(Math.random() * 150)),
              });
            }
          }
        }
        const newItems = {};
        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        setItems(newItems);
      }, 1000);
     };

  const renderItem = (item) => {
    // console.log(items[tempDate][0].name);
    console.log(items);
    return (
      <TouchableOpacity>
        {/* <Card>
          <Card.Content> */}
        {/* <View
        //   style={{
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //   }}
        > */}
          <Text>{item.name}</Text>
        {/* </View> */}
        {/* </Card.Content>
        </Card> */}
      </TouchableOpacity>
    );
  };

  function renderEmptyDate() {
    return (
      <View>
        <Text>No tasks for the day!</Text>
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
      //   renderEmptyDate={renderEmptyDate}
    />
  );
}

export default CalenderTab;
