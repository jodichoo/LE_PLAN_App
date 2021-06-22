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

function AddTaskBar(props) {
  const [addWorkClicked, setAddWorkClicked] = useState(false);
  const [addLifeClicked, setAddLifeClicked] = useState(false);
  //const { todayTasks, selectedDate } = props; for meter in reactjs
  const { selectedDate, setShowAdd } = props;

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
            setShowAdd={setShowAdd}
          />
        )}
        {addLifeClicked && (
          <TaskForm
            selectedDate={selectedDate}
            addWorkClicked={addWorkClicked}
            setAddWorkClicked={setAddWorkClicked}
            setAddLifeClicked={setAddLifeClicked}
            setShowAdd={setShowAdd}
          />
        )}
      </View>
    </View>
  );
}

export default AddTaskBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }, 

  buttons: {
    margin: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  buttonStyle: {
    paddingVertical: 8, 
    paddingHorizontal: 20,
    backgroundColor: 'turquoise',
    borderRadius: 6
  },

  buttonText: {
    color: 'whitesmoke',
    fontWeight: 'bold', 
    fontSize: 16
  },

  formContainer: {
    paddingHorizontal: 8,
    flex: 1,
    width: '100%'
  }
})