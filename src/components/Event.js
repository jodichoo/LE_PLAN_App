import React, { useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import TaskForm from "./TaskForm";
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

function Event(props) {
  const { selectedDate, task } = props;
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [editTask, setEditTask] = useState(task);
  const [edit, setEdit] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

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

  function triggerEdit(task) {
    setEdit(true);
    setEditTask(task);
  }

  function toggleDesc() {
    setShowDesc(!showDesc);
  }

  return (
    <>
    <View style={styles.taskWDesc}>
      <View style={styles.task}>
        <TouchableOpacity
          onLongPress={() => triggerEdit(task)}
          onPress={() => toggleDesc()}
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
        
      </View>
      {showDesc && <View style={styles.taskDesc}>
            <Text style={styles.bolded}>{task.desc}</Text>
          </View>}
    </View>

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
      </>
  );
}

export default Event;

const styles = StyleSheet.create({
  taskWDesc: {
    flexDirection: 'column', 
  },

  task: {
    padding: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-evenly'
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

  taskDesc: {
    alignItems: 'center'
  },

  text: {
    fontSize: 16,
  },

  bolded: {
    fontWeight: "bold",
    fontSize: 16,
  },

//   edit: {
//     zIndex: 1,
//     height: "100%",
//     width: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   formContainer: {
//     margin: 50,
//     padding: 15,
//     backgroundColor: "whitesmoke",
//     borderRadius: 15,
//   },
});
