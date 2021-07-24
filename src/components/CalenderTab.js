import React, { useEffect, useState, useContext } from "react";
import { Agenda } from "react-native-calendars";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { ThemeContext } from "../theme/ThemeContext";
import CalendarItem from "./CalendarItem";
import moment from "moment";
import { View, Text } from "react-native";

function CalenderTab(props) {
  const { tasks } = props;
  const { dark, theme } = useContext(ThemeContext);
  const [items, setItems] = useState({});
  const [triggerLoad, setTriggerLoad] = useState(moment().format("YYYY-MM-DD"));
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);

  useEffect(() => {
    loadOnMonth(triggerLoad);
  }, [tasks, triggerLoad]);

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
      <>
        <CalendarItem
          item={item}
          selectedDate={item.date}
          setTriggerLoad={setTriggerLoad}
        />
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
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "300", color: theme.color }}>
          No tasks for the day!
        </Text>
      </View>
    );
  }

  const styles = {
    container: {
      // marginTop: 50,
    },
    theme: {
      agendaDayTextColor: "grey",
      agendaDayNumColor: "grey",
      agendaTodayColor: "turquoise",
      agendaKnobColor: "turquoise",
      dotColor: "turquoise",
      selectedDotColor: "turquoise",
      selectedDayTextColor: "#ffffff",
      todayTextColor: "turquoise",
      selectedDayBackgroundColor: "gray",
      backgroundColor: dark ? "rgba(16,16,16,0)" : "#ffffff",
      calendarBackground: dark ? "#0D0C0C" : "#ffffff",
      dayTextColor: dark ? 'grey' :  '#2d4150',
      monthTextColor: dark ? 'turquoise' : 'black',
    },
  };

  return (
    <>
    <View style={{height: 30, color: dark ? "#0D0C0C" : "#ffffff"}}></View>
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
    </>
  );
}

export default CalenderTab;
