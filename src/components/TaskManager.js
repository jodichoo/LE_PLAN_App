import React, { useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import Greeting from "./Greeting";
import TaskForm from "./TaskForm";
import AddTaskBar from "./AddTaskBar";
import moment from "moment";
import {
  StyleSheet,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Pressable,
} from "react-native";
import Checkbox from "expo-checkbox";

function TaskManagerTab(props) {
  const { setTasks, tasks, selectedDate } = props;
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [editTask, setEditTask] = useState({});
  const [edit, setEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDesc, setshowDesc] = useState(false);

  function deleteTask(task) {
    //delete task from database
    userTasks.collection(selectedDate).doc(task.id).delete();
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

  function convertTime(num) {
    const s = parseFloat(num).toFixed(2).toString();
    const split = s.split(".");
    if (split[0] < 10) {
      return "0" + split[0] + ":" + split[1];
    } else {
      return split[0] + ":" + split[1];
    }
  }

  function handleCheck(task) {
    //toggle isComplete for the selected task
    userTasks.collection(selectedDate).doc(task.id).update({
      isComplete: !task.isComplete,
    });
  }

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

  function triggerEdit(task) {
    setEdit(true);
    setEditTask(task);
  }

  function renderTask(task) {
    return (
      <>
        <TouchableOpacity
          onLongPress={() => triggerEdit(task)}
          style={styles.task}
        >
          <View style={styles.taskField}>
            <Checkbox
              value={task.isComplete}
              onValueChange={() => handleCheck(task)}
            />
          </View>
          <View style={styles.taskField}>
            <Text style={styles.bolded}>{convertTime(task.time)}</Text>
          </View>
          <View style={styles.taskName}>
            <Text style={styles.text}>{task.name}</Text>
          </View>
          <View style={styles.taskField}>
            <Text style={styles.bolded}>{task.isWork ? "Work" : "Play"}</Text>
          </View>
          <View style={styles.deleteButton}>
            <Button title="Delete" onPress={() => deleteTask(task)} />
          </View>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Greeting selectedDate={selectedDate} tasks={tasks} setTasks={setTasks} />
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
      <Modal transparent={true} visible={edit}>
        <TouchableOpacity
          onPress={() => setEdit(false)}
          style={{ backgroundColor: "#000000aa", flex: 1 }}
        >
          {/* //to implement touch outside => remove modal */}
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
      </Modal>
      {/* toggle add task */}
      <Pressable onPress={() => setShowAdd(!showAdd)}>
        <Text style={{fontSize: 30}}>+</Text>
      </Pressable>
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
              backgroundColor: "#ffffff",
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
});
