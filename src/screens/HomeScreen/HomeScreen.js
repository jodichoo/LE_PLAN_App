import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import {AuthContext} from '../../navigation/AuthProvider';
import TaskForm from '../../components/TaskForm';
import AddTaskTab from '../../components/AddTaskTab';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
    const {currentUser, logout} = useContext(AuthContext);
    console.log(currentUser.l)
 
    return (
        <View style={styles.container}>
            <AddTaskTab selectedDate={moment().format("YYY-MM-DD")}/>
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