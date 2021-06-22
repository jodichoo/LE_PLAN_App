import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import TaskForm from "./TaskForm";
import Swipeable from 'react-native-swipeable-row'; 
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
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

  function addDurationAndFormat(time, dur) {
    var newMoment = moment(); 
    var h; 
    if (time === 0) {
      h = time; 
      newMoment = newMoment.hour(h); 
    } else {
      const str = time.toFixed(2);
      const split = str.split(".");
      h = parseInt(split[0]);
      const m = parseInt(split[1]);
      newMoment = newMoment.hour(h).minute(m); 
    }
    console.log(newMoment.format('HH:mm'));
    return newMoment.add(dur, 'hours').format('HH:mm');
  }

  const rightButtons = [
    <TouchableHighlight style={styles.delete} onPress={() => {
      deleteTask(item);
      Alert.alert("Are you sure you want to delete?");
    }}>
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableHighlight>
  ]; 

  return (
    <Swipeable rightButtons={rightButtons}>

    <TouchableOpacity
      onPress={triggerEdit}
      style={styles.touchable}
    >
      {!edit && (
        <View style={styles.container}>

          <View style={styles.left}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {convertTime(item.time)}
              {"-"}
              {addDurationAndFormat(item.time, item.dur)}
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 14 }}>{item.desc}</Text>
             
          </View>

          <View style={styles.right}>
            <Text style={{fontWeight: 'bold', color: 'grey'}}>{item.isWork ? "WORK" : "PLAY"}</Text> 
          </View>
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
    </Swipeable>

  );
}

export default CalendarItem;

const styles = StyleSheet.create({
  touchable: {
      flex: 1,
      marginTop: 15,
      marginRight: 10,
      marginBottom: -15,
      padding: 8,
      borderRadius: 5,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
  },

  left: {
    flex: 0.7,
  }, 

  right: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }, 

  delete: {
    marginTop: 15,
    zIndex: 0,
    height: '100%',
    backgroundColor: '#c95353',
    justifyContent: 'center'
  },

  buttonText: {
    margin: '5%',
    zIndex: 1,
    color: 'whitesmoke',
    fontWeight: 'bold'
  }
})