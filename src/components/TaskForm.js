import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/config";
import moment from "moment";
import { useAuth } from "../navigation/AuthProvider";
// import Checkbox from 'expo-checkbox';
import NumberPlease from "react-native-number-please";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
// import styles from "./styles";

function TaskForm(props) {
  const {
    addWorkClicked,
    setAddWorkClicked,
    setAddLifeClicked,
    editTask,
    edit,
    setEdit,
    selectedDate,
  } = props;
  const today = moment().format("YYYY-MM-DD").split('-');
  const currDate = [today[2], today[1], today[0]];
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  // const [taskDate, setTaskDate] = useState(selectedDate);
  const [taskHrs, setTaskHrs] = useState(0);
  const [taskMins, setTaskMins] = useState(0);
  const [taskDur, setTaskDur] = useState("");
  const [check, setCheck] = useState(true);
  const [isWork, setIsWork] = useState(true);
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);

  const selectedD = selectedDate.split("-");
  const [taskDate, setTaskDate] = useState([
    { id: "day", value: parseInt(selectedD[2]) },
    { id: "month", value: parseInt(selectedD[1])}, 
    { id: "year", value: parseInt(selectedD[0]) },
  ]);
  const dateRange = [
    { id: "day", label: "", min: 1, max: 31 },
    { id: "month", label: "", min: 1, max: 12 },
    { id: "year", label: "", min: new Date().getFullYear(), max: 2100 },
  ];

  const [taskTime, setTaskTime] = useState([
    { id: "hour", value: 0 },
    { id: "min", value: 0 },
  ]);
  const timeRange = [
    { id: "hour", label: "h", min: 0, max: 23 },
    { id: "min", label: "min", min: 0, max: 59 },
  ];

  useEffect(() => {
    if (edit) {
      setTaskName(editTask.name);
      setTaskDesc(editTask.desc);
      setTaskDate(editTask.date);
      setTaskHrs(getHour(editTask.time));
      setTaskMins(getMin(editTask.time));
      setTaskDur(editTask.dur);
      setIsWork(editTask.isWork);

      //   if (editTask.isWork) {
      //     document.getElementById("work-radio-edit").checked = true;
      //   } else {
      //     document.getElementById("life-radio-edit").checked = true;
      //   }
    }
  }, []);

  function getHour(num) {
    if (num === 0) {
      return num;
    } else {
      const str = num.toString();
      const split = str.split(".");
      return parseInt(split[0]);
    }
  }

  function getMin(num) {
    if (num === 0) {
      return num;
    } else {
      const str = num.toString();
      const split = str.split(".");
      return parseInt(split[1]);
    }
  }

  function removeTaskForm() {
    // e.preventDefault();
    if (edit) {
      setEdit(false);
    } else {
      setAddWorkClicked(false);
      setAddLifeClicked(false);
    }
  }

  function initStates() {
    if (edit) {
      setEdit(false);
    } else {
      setAddWorkClicked(false);
      setAddLifeClicked(false);
    }
    setTaskName("");
    setTaskDesc("");
    setTaskHrs(0);
    setTaskMins(0);
    setTaskDur("");
    setTaskDate(currDate);
    setIsWork(true);
  }

  function handleAddTask() {
    // e.preventDefault();
    const t =
      parseFloat(taskTime[0].value) + parseFloat(taskTime[1].value / 100);
    console.log();
    //create a new doc within the relevant collection
    const d =
      taskDate[2].value + "-" + taskDate[1].value + "-" + taskDate[0].value;

    const formatDate = moment(d, "YYYY-MM-DD").format("YYYY-MM-DD");
    console.log(formatDate);
    const ref = userTasks.collection(formatDate).doc();
    console.log(ref);
    const work = edit ? isWork : addWorkClicked;
    console.log(taskName);
    console.log(taskDesc);
    console.log(taskDur);
    // update tasks here
    const newTask = {
      id: ref.id, //id field necessary to delete task later
      date: formatDate,
      isWork: work, //work
      name: taskName,
      desc: taskDesc,
      time: t,
      dur: taskDur,
      isComplete: false,
    };
    //write to database here
    console.log(work);
    //add the new task to the database
    ref.set(newTask);

    //update work/lifeTime for the meter
    const whatday = moment().day() === 0 ? 7 : moment().day(); // 1,2,3,4....7
    const numDays = whatday - 1; // num of times to mathfloor
    const monDate = moment().subtract(numDays, "days");
    if (moment(d, "YYYY-MM-DD").diff(monDate, "days") < 6) {
      //change below
      handleCounters(work, "+", taskDur);
    }
    initStates();
  }

  function handleEditTask(e) {
    const whatday = moment().day() === 0 ? 7 : moment().day(); // 1,2,3,4....7
    const numDays = whatday - 1; // num of times to mathfloor
    const monDate = moment().subtract(numDays, "days");
    userTasks
      .collection(editTask.date)
      .doc(editTask.id)
      .delete()
      .then(() => {
        if (moment(editTask.date, "YYYY-MM-DD").diff(monDate, "days") < 6) {
          //if editing, delete the previous task + subtract from work/lifeTime for meter
          console.log("subtract");
          handleCounters(editTask.isWork, "-", editTask.dur);
        }
      });
  }

  function handleCounters(work, operator, dur) {
    userTasks.get().then((doc) => {
      if (work) {
        const currWork = doc.data().workTime;
        userTasks.update({
          workTime: eval(
            currWork.toString() + operator + parseFloat(dur).toString()
          ),
        });
      } else {
        const currLife = doc.data().lifeTime;
        userTasks.update({
          lifeTime: eval(
            currLife.toString() + operator + parseFloat(dur).toString()
          ),
        });
      }
    });
  }

function styleTime(value) {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}

  function configureTime(values) {
      setTaskTime(values);
      setTaskHrs(styleTime(values[0].value));
      setTaskMins(styleTime(values[1].value));
  }

  //   function isChecked() {
  //     // e.preventDefault();
  //     setCheck(!check);
  //     let reminder = document.getElementById("rem-interval");
  //     if (check === true) {
  //       reminder.style.display = "block";
  //     } else {
  //       reminder.style.display = "none";
  //     }
  //   }

  return (
    <View>
      <View>
        <Text>Task Name: </Text>
        <TextInput
          value={taskName}
          onChangeText={(e) => setTaskName(e)}
          required
        />
      </View>

      <View>
        <Text>Description: </Text>
        <TextInput value={taskDesc} onChangeText={(e) => setTaskDesc(e)} />
      </View>

      <View>
        <Text>Date: </Text>
        <NumberPlease
          digits={dateRange}
          values={taskDate}
          onChange={(values) => setTaskDate(values)}
        />
      </View>

      <View>
        <Text>
          Time: {taskHrs} : {taskMins}{" "}
        </Text>
        <NumberPlease
          digits={timeRange}
          values={taskTime}
          onChange={(values) => configureTime(values)}
        />
      </View>

      <View>
        <Text>Duration: </Text>
        <TextInput
          value={taskDur}
          placeholder="E.g. 2.25"
          onChangeText={(e) => setTaskDur(e)}
        />
      </View>

      <View>
        <Button
          title="Submit"
          onPress={() => {
            edit && handleEditTask();
            handleAddTask();
          }}
        />
        <Button title="Cancel" onPress={removeTaskForm} />
      </View>
    </View>
  );
}
{
  /* <View>
        <Checkbox
            // style={styles.checkbox}
            onChangeValue={isChecked}
            value={false}
          />{" "}
        <Text>Set Reminders</Text>
      </View>

      <View style={{ display: "none" }}>
        {/* <Checkbox style={styles.checkbox} /> <Text>10 min</Text>
          <Checkbox style={styles.checkbox} /> <Text>30 min</Text>
          <Checkbox style={styles.checkbox} /> <Text>1 hour before</Text>
          <Checkbox style={styles.checkbox} /> <Text>3 hours before</Text>
          <Checkbox style={styles.checkbox} /> <Text>1 day before</Text>
          <Checkbox style={styles.checkbox} /> <Text>3 days before</Text>
          <Checkbox style={styles.checkbox} /> <Text>1 week before</Text>
          <Checkbox style={styles.checkbox} /> <Text>2 weeks before</Text> */
}
{
  /* </View> */
}

export default TaskForm;
