import React, { useEffect, useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";

function CalenderTab() {
  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

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
              name: "Item for " + strTime + " #" + j,
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
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        {/* <Card>
          <Card.Content> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>{item.name}</Text>
            </View>
          {/* </Card.Content>
        </Card> */}
      </TouchableOpacity>
    );
  };

  return (   
    //   <Agenda style={{flex:1, height: 600}}
    //     items={items}
    //     loadItemsForMonth={loadItems}
    //     renderItem={renderItem}
    //   />
    <Agenda 
       items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
    />
  );
}
{/* <Calendar
         onDayPress={(date) => handleSelectedDate(date)}
        enableSwipeMonths={true}
        firstDay={1}
      /> */}
export default CalenderTab;
