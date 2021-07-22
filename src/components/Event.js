import React, { useState, useContext } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { ThemeContext } from "../theme/ThemeContext";
import TaskForm from "./TaskForm";
import moment from "moment";
import { AntDesign, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import CheckBox from 'react-native-check-box'

function Event(props) {
  const { selectedDate, task } = props;
  const { currentUser } = useAuth();
  const { dark, theme } = useContext(ThemeContext);
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

  const styles = StyleSheet.create({
    taskWDesc: {
      flexDirection: 'column', 
      marginVertical: 4, 
    },
  
    task: {
      padding: 1.6,
      width: "100%",
      flexDirection: "row",
      justifyContent: 'space-evenly',
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
      flex: 0.1,
      alignItems: "center",
      justifyContent: "center",
    },
  
    taskDesc: {
      alignItems: 'center'
    },
  
    text: {
      fontSize: 17,
      color: theme.color,
    },
  
    bolded: {
      fontWeight: "bold",
      fontSize: 14.5,
    },

    time: {
      fontWeight: 'bold', 
      fontSize: 12,
      color: theme.color,
    }
  });

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
            <CheckBox
              isChecked={task.isComplete}
              onClick={() => handleCheck(task)}
              checkBoxColor={theme.color}
            />
          </View>
          <View style={styles.taskField}>
            <Text style={styles.time}>{convertTime(task.time)}</Text>
          </View>
          <View style={styles.taskName}>
            <Text style={styles.text}>{task.name}</Text>
          </View>
          <View style={styles.taskField}>
            {task.isWork ? <Octicons name="briefcase" size={20} color="pink" /> : <MaterialCommunityIcons name="gamepad-variant" size={23} color="turquoise" />}
          </View>
          <View style={styles.deleteButton}>
            {/* <Button title="Delete" onPress={() => deleteTask(task)} /> */}
            <Pressable  onPress={() => deleteTask(task)}>
              <AntDesign name='delete' size={17} color={dark ? "whitesmoke" : "grey"}/>
            </Pressable>
            
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


