import React, { useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import Greeting from "./Greeting";
import TaskForm from "./TaskForm";
import AddTaskBar from "./AddTaskBar";
import moment from "moment";
import {
  StyleSheet,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Modal,
  Pressable,
} from "react-native";

function Event(props) {

}

export default Event;