import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from "react-native";

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

  return (
    <View>
      <Button title="Work" onPress={showWorkTaskForm} />
      <Button title="Play" onPress={showLifeTaskForm} />
      <View>
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
