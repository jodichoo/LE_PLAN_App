import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import { ThemeContext } from "../theme/ThemeContext";
import moment from "moment";
import NumberPlease from "react-native-number-please";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

function TaskForm(props) {
  const {
    addWorkClicked,
    setAddWorkClicked,
    setAddLifeClicked,
    setShowAdd,
    editTask,
    edit,
    setEdit,
    selectedDate,
    updateCalendar,
    setTriggerLoad,
  } = props;
  const { dark, theme } = useContext(ThemeContext);
  const today = moment().format("YYYY-MM-DD").split("-");
  const currDate = [today[2], today[1], today[0]];
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  // const [taskDate, setTaskDate] = useState(selectedDate);
  const [taskHrs, setTaskHrs] = useState(0);
  const [taskMins, setTaskMins] = useState(0);
  const [taskDur, setTaskDur] = useState("");
  const [error, setError] = useState(undefined); 
  // const [check, setCheck] = useState(true);
  const [isWork, setIsWork] = useState(true);
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);

  // const selectedD = selectedDate.split("-");
  // const [taskDate, setTaskDate] = useState([
  //   { id: "day", value: parseInt(selectedD[2]) },
  //   { id: "month", value: parseInt(selectedD[1])}, 
  //   { id: "year", value: parseInt(selectedD[0]) },
  // ]);
  // const dateRange = [
  //   { id: "day", label: "", min: 1, max: 31 },
  //   { id: "month", label: "", min: 1, max: 12 },
  //   { id: "year", label: "", min: new Date().getFullYear(), max: 2100 },
  // ];

  // const [taskTime, setTaskTime] = useState([
  //   { id: "hour", value: 0 },
  //   { id: "min", value: 0 },
  // ]);
  // const timeRange = [
  //   { id: "hour", label: "h", min: 0, max: 23 },
  //   { id: "min", label: "min", min: 0, max: 59 },
  // ];

  const [dateTime, setDateTime] = useState(new Date()); 

  function getDateTimeFromDb(d, h, m) {
    const newMoment = moment(d, 'YYYY-MM-DD').hour(h).minute(m);
    const newDateTime = newMoment.toDate(); 
    return newDateTime; 
  }

  useEffect(() => {
    if (edit) {
      const newDateTime = getDateTimeFromDb(editTask.date, getHour(editTask.time), getMin(editTask.time))
      setTaskName(editTask.name);
      setTaskDesc(editTask.desc);
      setDateTime(newDateTime);
      // setTaskDate(editTask.date);
      // setTaskHrs(getHour(editTask.time));
      // setTaskMins(getMin(editTask.time));
      setTaskDur(`${editTask.dur}`);
      setIsWork(editTask.isWork);
      //   if (editTask.isWork) {
      //     document.getElementById("work-radio-edit").checked = true;
      //   } else {
      //     document.getElementById("life-radio-edit").checked = true;
      //   }
    }
  }, []);

  // function getHour(num) {
  //   const newNum = parseFloat(num).toFixed(2);
  //   if (newNum === 0) {
  //     return newNum;
  //   } else {
  //     const str = newNum.toString();
  //     const split = str.split(".");
  //     return parseInt(split[0]);
  //   }
  // }

  function getHour(num) {
    const s = parseFloat(num).toFixed(2);
    const split = s.split(".");
    return parseInt(split[0]); 
  }

  function getMin(num) {
    const s = parseFloat(num).toFixed(2);
    const split = s.split(".");
    return parseInt(split[1]); 
  }

  function removeTaskForm() {
    if (edit) {
      setEdit(false);
    } else {
      setAddWorkClicked(false);
      setAddLifeClicked(false);
      setShowAdd(false);
    }
  }

  function initStates() {
    if (updateCalendar) {
      const d = moment(dateTime.toLocaleDateString('en-CA'), 'YYYY-MM-DD');
      const formatDate = d.format("YYYY-MM-DD");
      setTriggerLoad(formatDate);
      setEdit(false);
    } else if (edit) {
      setEdit(false);
    } else {
      setAddWorkClicked(false);
      setAddLifeClicked(false);
      setShowAdd(false);
    }
    setTaskName("");
    setTaskDesc("");
    // setTaskHrs(0);
    // setTaskMins(0);
    setDateTime(new Date()); 
    setTaskDur("");
    // setTaskDate(currDate);
    setIsWork(true);
  }

  function handleAddTask() {
    //format the time to be stored in database
    const strTime = dateTime.toLocaleTimeString('en-GB'); //format -> 23:59:59 
    const split = strTime.split(':'); 
    const t = parseFloat(split[0]) + parseFloat(split[1]) / 100; 
    console.log(t); 
    
    //format the date to be stored in/queried from database
    // console.log(dateTime.toLocaleDateString('en-CA'));
    // const c = moment(dateTime.toLocaleDateString('en-CA'), 'YYYY-MM-DD');
    const d = moment(dateTime).format("YYYY-MM-DD"); 

    //create a new doc within the relevant collection
    const ref = userTasks.collection(d).doc();
    // console.log(ref);
    const work = edit ? isWork : addWorkClicked;
    console.log(taskName);
    console.log(taskDesc);
    console.log(taskDur);
    // update tasks here
    const newTask = {
      id: ref.id, //id field necessary to delete task later
      date: d,
      isWork: work, 
      name: taskName,
      desc: taskDesc,
      time: t,
      dur: parseFloat(taskDur),
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

  function handleEditTask() {
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

  // function configureTime(values) {
  //     setTaskTime(values);
  //     setTaskHrs(styleTime(values[0].value));
  //     setTaskMins(styleTime(values[1].value));
  // }

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

  // function returnHome() {
  //   navigation.navigate("TaskManager")
  // }

const [show, setShow] = useState(false); 
const [mode, setMode] = useState('date'); 

function handleDateTime(e, selected) {
  const curr = selected || dateTime;
  setShow(Platform.OS === 'ios');  
  console.log(curr.toLocaleDateString('en-CA'), curr.toLocaleTimeString('en-GB'));
  setDateTime(curr); 
}

function showDatePicker() {
  setShow(true); 
  setMode('date');
}

function showTimePicker() {
  setShow(true); 
  setMode('time');
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
  },

  field: {
    margin: 8,
    width: "100%",
  },

  error: {
    alignItems: 'center', 
    backgroundColor:'rgba(255, 0, 0, 0.7)',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },  

  errorText: {
    color: theme.color,
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.color,
  },

  input: {
    paddingHorizontal: 10,
    height: 30,
    borderRadius: 4,
    borderColor: dark ? "whitesmoke" : 'black', 
    borderWidth: 1, 
    borderStyle: 'solid',
    color: theme.color
  },

  buttons: {
    margin: 12,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },

  formButton: {
    backgroundColor: dark ? "whitesmoke" : "grey",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonStyle: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderColor: dark ? 'whitesmoke' : 'black',
  },
  buttonText: {
    color: dark ? "black" : "whitesmoke",
    fontSize: 14,
    fontWeight: "bold",
  },
});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      { error && <View style={styles.error}><Text style={styles.errorText}>{error}</Text></View> }
      { edit && 
        <View style={styles.buttons}>
          <Pressable style={{...styles.buttonStyle, backgroundColor: isWork ? 'black' : 'pink'}} onPress={() => setIsWork(true)}>
            <Text style={{...styles.buttonText, color: isWork ? 'whitesmoke' : 'black'}}>Work</Text>
          </Pressable>
          <Pressable style={{...styles.buttonStyle, backgroundColor: !isWork ? 'black' : 'turquoise'}} onPress={() => setIsWork(false)}>
            <Text style={{...styles.buttonText, color: !isWork ? 'whitesmoke' : 'black'}}>Play</Text>
          </Pressable>
        </View>}
      <View style={styles.field}>
        <Text style={styles.text}>Task Name: </Text>
        <TextInput
          style={styles.input}
          value={taskName}
          onChangeText={(e) => setTaskName(e)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.text}>Description: </Text>
        <TextInput
          style={styles.input}
          value={taskDesc}
          onChangeText={(e) => setTaskDesc(e)}
        />
      </View>

      {/* <View style={styles.field}>
        <Text style={styles.text}>Date: </Text>
        <NumberPlease
          digits={dateRange}
          values={taskDate}
          onChange={(values) => setTaskDate(values)}
        />
      </View> */}
      <View style={styles.field}>
      {show && <DateTimePicker 
          mode= {mode}
          value={dateTime}
          onChange={handleDateTime}
          minimumDate={new Date()}
          />}
      </View>
      <View style={styles.field}>
        <Pressable style={styles.formButton} onPress={showDatePicker}>
        <Text style={styles.buttonText}>Date: {dateTime.toLocaleDateString('en-CA')}</Text>
        </Pressable>
      </View>

      <View style={styles.field}>
        <Pressable style={styles.formButton} onPress={showTimePicker}>
        <Text style={styles.buttonText}>Time: {dateTime.toLocaleTimeString('en-GB')}</Text>
        </Pressable>
      </View>

      {/* <View style={styles.field}>
        <Text style={styles.text}>
          Time: {taskHrs} : {taskMins}{" "}
        </Text>
        <NumberPlease
          digits={timeRange}
          values={taskTime}
          onChange={(values) => configureTime(values)}
        />
      </View> */}

      <View style={styles.field}>
        <Text style={styles.text}>Duration: </Text>
        <TextInput
          keyboardType='numeric'
          style={styles.input}
          value={taskDur}
          placeholder="E.g. 2.25"
          placeholderTextColor={'gray'}
          onChangeText={(e) => setTaskDur(e)}
        />
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={styles.formButton}
          onPress={() => {
            if (taskName === "") {
              setError("Please input a task name"); 
            } else if (taskDur === undefined || taskDur === '0' || taskDur.length === 0) {
              setError("Pleae input a valid duration in hours"); 
            } else {
              edit && handleEditTask();
              handleAddTask();
            }
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <Pressable style={styles.formButton} onPress={removeTaskForm}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default TaskForm;

