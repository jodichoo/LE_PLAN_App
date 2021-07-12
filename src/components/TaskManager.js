import React, { useState, useEffect } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import Greeting from "./Greeting";
import AddTaskBar from "./AddTaskBar";
import Event from "./Event";
import Meter from "./Meter";
import moment from "moment";
import { Ionicons } from '@expo/vector-icons'; 
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";

function TaskManagerTab(props) {
  const { setTasks, tasks, selectedDate } = props;
  const { currentUser, logout } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [editTask, setEditTask] = useState({});
  const [edit, setEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [storedDate, setStoredDate] = useState('');
  const [dateTimer, setDateTimer] = useState(moment().date()); 

  useEffect(() => {
    console.log('setting stored date');
    userTasks
      .get()
      .then((doc) => {
        if (doc.exists) {
          //account details exist
          setStoredDate(doc.data().storedDate);
        }
      })
  }, []);

  useEffect(() => {
    var timer = setInterval(() => setDateTimer(moment().date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [])

  function separateTasks(arr) {
    const len = arr.length;
    const completed = [];
    const incomplete = [];
    //go through array of tasks
    for (var i = 0; i < len; i++) {
      if (arr[i].isComplete) {
        //if task is complete, push into complete array
        completed.push(arr[i]);
      } else {
        //else, push into incomplete array
        incomplete.push(arr[i]);
      }
    }
    return [incomplete, completed]; //return separated tasks
  }

  function renderTask(task) {
    return (
      <View>
        <Event selectedDate={selectedDate} task={task} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Greeting selectedDate={selectedDate} storedDate={storedDate} setStoredDate={setStoredDate} dateTimer={dateTimer}/>
      <Meter storedDate={storedDate} />
      <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>
        Here are your tasks for today
      </Text>
      <View style={styles.tasksContainer}>
        {/* incomplete tasks  */}
        {separateTasks(tasks)[0].map((task) => renderTask(task))}
        {/* complete tasks */}
        {separateTasks(tasks)[1].map((task) => renderTask(task))}
      </View>
      {/* toggle edit but "deletes" as date somehow becomes invalid in db*/}
      {/* {edit && (
        <View style={styles.edit}>
          <View style={styles.formContainer}>
            <TaskForm
              selectedDate={selectedDate}
              editTask={editTask}
              edit={edit}
              setEdit={setEdit}
            />
          </View>
        </View>
      )} */}
      {/* <Modal transparent={true} visible={edit}>
        <TouchableOpacity
          onPress={() => setEdit(false)}
          style={{ backgroundColor: "#000000aa", flex: 1 }}
        >
          //to implement touch outside => remove modal
          <TouchableOpacity
            onPress={() => console.log("")}
            activeOpacity={1}
            style={{
              backgroundColor: "#ffffff",
              margin: 50,
              padding: 40,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <TaskForm
              selectedDate={selectedDate}
              editTask={editTask}
              edit={edit}
              setEdit={setEdit}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal> */}
      {/* toggle add task */}
      <View style={styles.addTask}>
        <Pressable
          onPress={() => setShowAdd(!showAdd)}
        >
          <Ionicons name="ios-add-circle" size={80} color="black" />
          {/* <Text style={{ fontSize: 30, color: "whitesmoke" }}>+</Text> */}
        </Pressable>
      </View>
      {/* <View style={styles.log}>
        <Pressable onPress={logout} style={styles.addTaskButton}>
          <Text style={{ fontSize: 20, color: "whitesmoke" }}>logout</Text>
        </Pressable>
      </View> */}
      <Modal transparent={true} visible={showAdd}>
        <TouchableOpacity
          onPress={() => setShowAdd(false)}
          style={{ backgroundColor: "#000000aa", flex: 1 }}
        >
          {/* to implement touch outside => remove modal */}
          <TouchableOpacity
            onPress={() => console.log("")}
            activeOpacity={1}
            style={{
              backgroundColor: "whitesmoke",
              margin: 50,
              padding: 40,
              borderRadius: 10,
              flex: 1,
            }}
          >
            <AddTaskBar selectedDate={selectedDate} setShowAdd={setShowAdd} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default TaskManagerTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  tasksContainer: {
    zIndex: 0,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  task: {
    padding: 0,
    width: "100%",
    flexDirection: "row",
  },

  taskName: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },

  taskField: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteButton: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 16,
  },

  bolded: {
    fontWeight: "bold",
    fontSize: 16,
  },

  edit: {
    zIndex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },

  formContainer: {
    margin: 50,
    padding: 15,
    backgroundColor: "whitesmoke",
    borderRadius: 15,
  },

  // log: {
  //   width: "100%",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  // },

  addTask: {
    alignSelf: "flex-end",
  },

});
