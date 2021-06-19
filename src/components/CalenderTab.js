import React, { useEffect, useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import { View, Text } from "react-native";

function CalenderTab() {
  function handleSelectedDate(d) {}

  return (
    <View>
      <Calendar
        monthFormat={"yyyy MM"}
        onDayPress={(date) => handleSelectedDate(date)}
        enableSwipeMonths={true}
        firstDay={1}
      />
    </View>
  );
}

export default CalenderTab;
