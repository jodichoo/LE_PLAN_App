import React, { useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import TaskForm from "./TaskForm";
import moment from "moment";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import Greeting from "./Greeting";

function TaskManager(props) {
  const { setTasks, tasks, selectedDate } = props;
  // const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [editTask, setEditTask] = useState({});
  const [edit, setEdit] = useState(false);

  //   function toggleTaskDesc(index, toggle) {
  //     // console.log(tasks[index].desc);
  //     let t = document.getElementById(index);
  //     if (toggle) {
  //       t.style.display = "block";
  //     } else {
  //       t.style.display = "none";
  //     }
  //   }

  function deleteTask(index) {
    //delete task from database
    userTasks.collection(selectedDate).doc(tasks[index].id).delete();
    //update work/life time in database
    const isWork = tasks[index].isWork;
    const dur = tasks[index].dur;

    const whatday = moment().day() === 0 ? 7 : moment().day(); // 1,2,3,4....7
    const numDays = whatday - 1; // num of times to mathfloor
    const monDate = moment().subtract(numDays, "days");

    if (moment(tasks[index].date, "YYYY-MM-DD").diff(monDate, "days") < 6) {
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

    //update local task variable
    const first = tasks.slice(0, index);
    const last = tasks.slice(index + 1, tasks.length);
    const newTasks = [...first, ...last];
  }

  function handleEditTask(index) {
    //setEdit(false);
    setEdit(true);
    setEditTask(tasks[index]);
    console.log("call edit");
  }

  function changeForm(e) {
    setEdit(false);
    console.log("change form");
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

  // const iconsStyle = {
  //     color: 'black',
  //     fontSize: '20px'
  // }

  return (
    <View>
    <Greeting selectedDate={selectedDate} tasks={tasks} setTasks={setTasks} />
      {tasks.map((task, index) => (
        <View key={index}>
          <View>
            <Checkbox />
          </View>
          <View>
            <Text>{convertTime(task.time)}</Text>
          </View>
          <TouchableOpacity onPress={() => handleEditTask(index)}>
            <Text>{task.name}</Text>
          </TouchableOpacity>
          <View>
            <Text>{task.isWork ? "Work" : "Play"}</Text>
          </View>
          <View>
            <Button title="Delete" onPress={() => deleteTask(index)} />
          </View>
        </View>
      ))}

      {edit && (
        <View>
          <View>
            <TaskForm selectedDate={selectedDate} editTask={editTask} edit={edit} setEdit={setEdit} />
          </View>
        </View>
      )}
    </View>
    // <div>
    // <table className='task-table'>
    //     <tbody>
    //         {tasks.map((task, index) => (
    //         <>
    //         <tr onMouseEnter={e => toggleTaskDesc(e, index, true)} onMouseLeave={e => toggleTaskDesc(e, index, false)}>
    //             <td><input type="checkbox" id="completed-check"/></td>
    //             <td>{convertTime(task.time)}</td>
    //             <td onClick={e => {changeForm(e); handleEditTask(e, index);}}>{task.name}</td>
    //             <td>{task.isWork ? 'WORK' : 'LIFE'}</td>
    //             {/* <td><button id="delete-task" onClick={e => deleteTask(e, index)}>Delete</button></td> */}
    //             <td><BsFillTrashFill onClick={e => deleteTask(e, index)}/></td>
    //         </tr>
    //         <tr>
    //             <td></td>
    //             <td></td>
    //             <td className='mouse-desc' id={index} style={{display: 'none'}}>{task.desc}</td>
    //             <td></td>
    //             <td></td>
    //         </tr>
    //         </>
    //         ))}
    //     </tbody>
    // </table>
    // {edit && <TaskForm editTask={editTask} edit={edit} setEdit={setEdit} />}
    // </div>
  );
}

export default TaskManager;
