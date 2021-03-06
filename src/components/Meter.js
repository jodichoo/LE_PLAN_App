import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { ThemeContext } from "../theme/ThemeContext";
import { View , Text, StyleSheet, TouchableOpacity } from "react-native";

function Meter(props) {
  const { storedDate } = props;
  const { currentUser } = useAuth();
  const { dark, theme } = useContext(ThemeContext);
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [workTime, setWorkTime] = useState(1);
  const [lifeTime, setLifeTime] = useState(1);
  const [totalTime, setTotalTime] = useState(1);
  const [playPerc, setPlayPerc] = useState(0.5); 
  const [workPerc, setWorkPerc] = useState(0.5); 
  const [hovered, setHovered] = useState("Work");
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    const unsubscribe = userTasks.onSnapshot((doc) => {
      if (doc.exists) {
        const w = doc.data().workTime;
        const l = doc.data().lifeTime;
        const t = w + l;
        setLifeTime(l);
        setWorkTime(w);
        setTotalTime(t);
        if (t !== 0) {
          setWorkPerc(w / t); 
          setPlayPerc(l / t);
        } 
        setLabel(`Work: ${(w * 100 / t).toFixed(1)}%`);
      }
    });
    return () => unsubscribe(); 
  }, [storedDate]);

  function touchWork(e) {
    setLabel(`Work: ${(workTime * 100 / totalTime).toFixed(1)}%`); 
  }

  function touchPlay(e) {
    setLabel(`Play: ${(lifeTime * 100 / totalTime).toFixed(1)}%`);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 0.18,
      flexDirection: 'column',
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },

    wrapper: {
      marginTop: 5, 
      flexDirection: 'row', 
      width: '90%',
      height: '28%',
      borderStyle: 'solid',
      borderColor: theme.color, 
      borderWidth: 1.7
    },

    emptyWrapper: {
      backgroundColor: 'grey',
      marginTop: 10, 
      width: '90%',
      height: '28%',
      borderStyle: 'solid',
      borderColor: theme.color, 
      borderWidth: 2
    },

    work: {
      flex: workPerc,
      backgroundColor: 'pink'
    },
    
    play: {
      flex: playPerc,
      backgroundColor: 'turquoise'
    }
  });

  return (
    <View style={styles.container}>
      {workTime === 0 && lifeTime === 0
        ? <>
            <Text style={{color: theme.color}}>No tasks for the week, add tasks to get started!</Text>
            <View style={styles.emptyWrapper}></View>
          </>
        : <>
            <Text style={{color: theme.color, fontWeight: "500"}}>{label}</Text>
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.work} onPress={touchWork}></TouchableOpacity>
              <TouchableOpacity style={styles.play} onPress={touchPlay}></TouchableOpacity>
            </View>
          </>}
    </View>
  )
}

export default Meter;