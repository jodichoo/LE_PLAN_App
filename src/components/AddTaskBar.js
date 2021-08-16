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
        <Pressable style={{...styles.buttonStyle, backgroundColor: addWorkClicked ? 'black' : 'pink'}} onPress={showWorkTaskForm}>
          <Text style={{...styles.buttonText, color: addWorkClicked ? 'whitesmoke' : 'black'}}>Work</Text>
        </Pressable>
        <Pressable style={{...styles.buttonStyle, backgroundColor: addLifeClicked ? 'black' : 'turquoise'}} onPress={showLifeTaskForm}>
          <Text style={{...styles.buttonText, color: addLifeClicked ? 'whitesmoke' : 'black'}}>Play</Text>
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
    borderStyle: 'solid',
    borderWidth: 1, 
    borderColor: 'black',
    paddingVertical: 8, 
    paddingHorizontal: 20,
    borderRadius: 6, 
  },

  buttonText: {
    fontWeight: 'bold', 
    fontSize: 16
  },

  formContainer: {
    flex: 1,
    width: '100%'
  }
})