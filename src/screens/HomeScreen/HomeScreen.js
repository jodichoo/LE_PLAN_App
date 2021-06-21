import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { AuthContext } from "../../navigation/AuthProvider";
import TaskForm from "../../components/TaskForm";
import AddTaskBar from "../../components/AddTaskBar";
import TaskManagerTab from "../../components/TaskManager";
import Meter from "../../components/Meter";
import CalendarTab from "../../components/CalenderTab";
import moment from "moment";
import { db } from "../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const HomeScreen = ({ navigation }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const currDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [error, setError] = useState("");
  //const history = useHistory();
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const userTasks = db.collection("users").doc(currentUser.uid);

  useEffect(() => {
    //get collection of current date's tasks
    const today = userTasks.collection(currDate);
    const unsubscribe = today.orderBy("time").onSnapshot((querySnapshot) => {
      const t = [];
      querySnapshot.forEach((doc) => {
        t.push(doc.data());
      });
      //set local tasks variable to array t
      setTodayTasks(t);
    });
    return () => unsubscribe();
  }, []);

  //gets and displays tasks based on date selected from left dashboard
  useEffect(() => {
    //get collection of tasks to be displayed
    const selected = userTasks.collection(selectedDate);
    //order collection by time, then push each item in collection into array
    const unsubscribe = selected.orderBy("time").onSnapshot((querySnapshot) => {
      const t = [];
      querySnapshot.forEach((doc) => {
        t.push(doc.data());
      });
      //set local tasks variable to array t
      setTasks(t);
    });
    return () => unsubscribe();
  }, [selectedDate]);

  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator initialRouteName="TaskManager">
      <Tabs.Screen name="Calendar">
        {(props) => <CalendarTab {...props} selectedDate={selectedDate} />}
      </Tabs.Screen>
      <Tabs.Screen name="TaskManager">
        {(props) => (
          <TaskManagerTab
            {...props}
            selectedDate={selectedDate}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </Tabs.Screen>
      {/* <Tabs.Screen name="AddTask">
        {(props) => (
          <AddTaskTab
            {...props}
            todayTasks={todayTasks}
            selectedDate={selectedDate}
          />
        )}
      </Tabs.Screen> */}
    </Tabs.Navigator>
  );
};

export default HomeScreen;
