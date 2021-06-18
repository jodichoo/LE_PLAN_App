import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {AuthContext} from '../../navigation/AuthProvider';
import TaskForm from '../../components/TaskForm';
import AddTaskTab from '../../components/AddTaskTab';
import TaskManager from '../../components/TaskManager';
import moment from 'moment';
import { db } from "../../firebase/config";

const HomeScreen = ({navigation}) => {
    const {currentUser, logout} = useContext(AuthContext);
    const currDate = moment().format('YYYY-MM-DD');
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
      }, [])
    
    
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

    return (
        <View style={styles.container}>
        <Text>Task List</Text>
            <TaskManager selectedDate={selectedDate} tasks={tasks} setTasks={setTasks} />
            <Text>+Add Tasks</Text>
            <AddTaskTab todayTasks={todayTasks} selectedDate={selectedDate}/>
            <Text>home</Text>
            <Button onPress={logout} title='log Out'/>
        </View>
    )
}

export default HomeScreen;
   // const [entityText, setEntityText] = useState('')
    // const [entities, setEntities] = useState([])

    // const entityRef = firebase.firestore().collection('entities')
    // const userID = currentUser.l;

    // useEffect(() => {
    //     entityRef
    //         .where("authorID", "==", userID)
    //         .orderBy('createdAt', 'desc')
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const newEntities = []
    //                 querySnapshot.forEach(doc => {
    //                     const entity = doc.data()
    //                     entity.id = doc.id
    //                     newEntities.push(entity)
    //                 });
    //                 setEntities(newEntities)
    //             },
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    // }, [])

    // const onAddButtonPress = () => {
    //     if (entityText && entityText.length > 0) {
    //         const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    //         const data = {
    //             text: entityText,
    //             authorID: userID,
    //             createdAt: timestamp,
    //         };
    //         entityRef
    //             .add(data)
    //             .then(_doc => {
    //                 setEntityText('')
    //                 Keyboard.dismiss()
    //             })
    //             .catch((error) => {
    //                 alert(error)
    //             });
    //     }
    // }

    // const renderEntity = ({item, index}) => {
    //     return (
    //         <View style={styles.entityContainer}>
    //             <Text style={styles.entityText}>
    //                 {index}. {item.text}
    //             </Text>
    //         </View>
    //     )
    // }
// import React from 'react'
// import { Text, View } from 'react-native'

// export default function HomeScreen(props) {
//     return (
//         <View>
//             <Text>Home Screen</Text>
//         </View>
//     )
// }