import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import TaskForm from "./TaskForm";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Button,
  Alert,
} from "react-native";

function CalendarItem(props) {
  const { item, selectedDate, setTriggerLoad } = props;
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [edit, setEdit] = useState(false);

  function convertTime(num) {
    const s = parseFloat(num).toFixed(2).toString();
    const split = s.split(".");
    if (split[0] < 10) {
      return "0" + split[0] + ":" + split[1];
    } else {
      return split[0] + ":" + split[1];
    }
  }

  function deleteTask(task) {
    //delete task from database
    userTasks.collection(task.date).doc(task.id).delete();
    setTriggerLoad(task.date); //visible lag in rerendering
    //update work/life time in database
    const isWork = task.isWork;
    const dur = task.dur;

    const whatday = moment().day() === 0 ? 7 : moment().day(); // 1,2,3,4....7
    const numDays = whatday - 1; // num of times to mathfloor
    const monDate = moment().subtract(numDays, "days");

    if (moment(task.date, "YYYY-MM-DD").diff(monDate, "days") < 6) {
      userTasks.get().then((doc) => {
        if (isWork) {
          const currWork = doc.data().workTime;
          userTasks.update({
            workTime: currWork - dur,
          });
        } else {
          const currLife = doc.data().lifeTime;
          userTasks.update({
            lifeTime: currLife - dur,
          });
        }
      });
    }
  }

  function triggerEdit() {
    setEdit(!edit);
  }

  return (
    <TouchableOpacity
      onPress={triggerEdit}
      style={{
        flex: 1,
        height: 70,
        marginTop: 30,
        marginRight: 10,
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
      }}
    >
      {!edit && (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {convertTime(item.time)}
            {"-"}
            {convertTime(item.time + item.dur)}
          </Text>
          <Text style={{ fontSize: 17 }}>{item.name}</Text>
          <Pressable
            onPress={() => {
              deleteTask(item);
              Alert.alert("Are you sure you want to delete?");
            }}
          >
            <Text>Delete</Text>
          </Pressable>
          <Text style={{ fontSize: 14 }}>{item.desc}</Text>
          <Text>{item.isWork ? "WORK" : "PLAY"}</Text>
        </View>
      )}
      {edit && (
        <TaskForm
          setTriggerLoad={setTriggerLoad}
          updateCalendar={true}
          selectedDate={selectedDate}
          editTask={item}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </TouchableOpacity>
  );
}

export default CalendarItem;
