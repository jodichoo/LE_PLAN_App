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
import { AuthContext } from "../../navigation/AuthProvider";
import { db } from "../../firebase/config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TaskManagerTab from "../../components/TaskManager";
import CalendarTab from "../../components/CalenderTab";
import FriendsTab from "../../components/FriendsTab";
import { Ionicons } from '@expo/vector-icons'; 
import moment from "moment";

const HomeScreen = ({ navigation }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const currDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(currDate);
  const [error, setError] = useState("");
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
      <Tabs.Navigator 
        initialRouteName="Today's Schedule"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Calendar') {
              iconName = focused
                ? 'calendar'
                : 'calendar-sharp';
            } else if (route.name === "Today's Schedule") {
              iconName = focused ? 'ios-list' : 'list-outline';
            } else if (route.name === "Friends") {
              iconName = focused 
                ? 'ios-people'
                : 'people-outline'
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'turquoise',
          inactiveTintColor: 'gray',
        }}
        >
        <Tabs.Screen name="Calendar">
          {(props) => (
            <CalendarTab {...props} selectedDate={selectedDate} tasks={tasks} />
          )}
        </Tabs.Screen>
        <Tabs.Screen name="Today's Schedule">
          {(props) => (
            <TaskManagerTab
              {...props}
              selectedDate={selectedDate}
              tasks={tasks}
              setTasks={setTasks}
            />
          )}
        </Tabs.Screen>
        <Tabs.Screen name="Friends" component={FriendsTab} />
      </Tabs.Navigator>
  );
};

export default HomeScreen;