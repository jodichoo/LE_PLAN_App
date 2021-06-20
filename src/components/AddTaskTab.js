import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import {
  StyleSheet,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Pressable
} from "react-native";
import styles from "../screens/HomeScreen/styles";

function AddTaskTab(props) {
  const [addWorkClicked, setAddWorkClicked] = useState(false);
  const [addLifeClicked, setAddLifeClicked] = useState(false);
  //const { todayTasks, selectedDate } = props; for meter in reactjs
  const { selectedDate } = props;

  function showWorkTaskForm() {
    if (addLifeClicked) {
      setAddLifeClicked(false);
    }
    setAddWorkClicked(true);
  }

  function showLifeTaskForm() {
    if (addWorkClicked) {
      setAddWorkClicked(false);
    }
    setAddLifeClicked(true);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    }, 

    buttons: {
      margin: 20,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },

    buttonStyle: {
      paddingVertical: 8, 
      paddingHorizontal: 65,
      backgroundColor: 'turquoise',
      borderRadius: 6
    },

    buttonText: {
      color: 'whitesmoke',
      fontWeight: 'bold', 
      fontSize: 16
    },

    formContainer: {
      paddingHorizontal: 20,
      flex: 1,
      width: '100%'
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {/* <Button style={styles.buttonStyle} title="Work" onPress={showWorkTaskForm} />
        <Button style={styles.buttonStyle} title="Play" onPress={showLifeTaskForm} /> */}
        <Pressable style={styles.buttonStyle} onPress={showWorkTaskForm}>
          <Text style={styles.buttonText}>Work</Text>
        </Pressable>
        <Pressable style={styles.buttonStyle} onPress={showLifeTaskForm}>
          <Text style={styles.buttonText}>Play</Text>
        </Pressable>
      </View>
      
      <View style={styles.formContainer}>
        {addWorkClicked && (
          <TaskForm
            selectedDate={selectedDate}
            addWorkClicked={addWorkClicked}
            setAddWorkClicked={setAddWorkClicked}
            setAddLifeClicked={setAddLifeClicked}
          />
        )}
        {addLifeClicked && (
          <TaskForm
            selectedDate={selectedDate}
            addWorkClicked={addWorkClicked}
            setAddWorkClicked={setAddWorkClicked}
            setAddLifeClicked={setAddLifeClicked}
          />
        )}
      </View>
    </View>
  );
}

export default AddTaskTab;
