import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { View , Text, StyleSheet, TouchableOpacity } from "react-native";

function Meter() {
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [workTime, setWorkTime] = useState(0);
  const [lifeTime, setLifeTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [hovered, setHovered] = useState("Work");
  const [loading, setLoading] = useState(true); 
  const [label, setLabel] = useState("Loading...");

  useEffect(() => {
    userTasks.onSnapshot((doc) => {
      if (doc.exists) {
        const w = doc.data().workTime;
        const l = doc.data().lifeTime;
        const t = w + l;
        setLifeTime(l);
        setWorkTime(w);
        setTotalTime(t);
        setLabel(`Work: ${(w * 100 / t).toFixed(1)}%`);
        setLoading(false); 
      }
    });
  }, []);

  function enterMeter(item) {
    return item.label === 'work' ? setHovered('Work') : setHovered('Play');
  }

  function getValueFormat(values, total) {
    if (total === 0) {
      return "";
    } else {
      return `${(values * 2 / total * 100).toFixed(1)}%`;
    }
  }

  function touchWork(e) {
    setLabel(`Work: ${(workTime * 100 / totalTime).toFixed(1)}%`); 
  }

  function touchPlay(e) {
    setLabel(`Play: ${(lifeTime * 100 / totalTime).toFixed(1)}%`);
  }

  const styles = StyleSheet.create({
    container: {
      height: '8%',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },

    wrapper: {
      marginTop: 10, 
      flexDirection: 'row', 
      width: '60%',
      height: '28%'
    },

    work: {
      flex: workTime / totalTime,
      backgroundColor: 'red'
    },
    
    play: {
      flex: lifeTime / totalTime,
      backgroundColor: 'green'
    }
  });

  return (
    <View style={styles.container}>
      {loading ? (<Text>Loading...</Text>)
        : (<>
            <Text>{label}</Text>
            <View style={styles.wrapper}>
              <TouchableOpacity style={styles.work} onPress={touchWork}></TouchableOpacity>
              <TouchableOpacity style={styles.play} onPress={touchPlay}></TouchableOpacity>
            </View></>)}
    </View>
  )

  return (
    loading ? (<Text>Loading...</Text>) : (<View>
      <Text>{label}</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.work} onPress={touchWork}></TouchableOpacity>
        <TouchableOpacity style={styles.play} onPress={touchPlay}></TouchableOpacity>
      </View>
    </View>)
    // <View>
    //   <Text>{label}</Text>
    //   <View style={styles.container}>
    //     <TouchableOpacity style={styles.work} onPress={touchWork}></TouchableOpacity>
    //     <TouchableOpacity style={styles.play} onPress={touchPlay}></TouchableOpacity>
    //   </View>
    // </View>
  );
}

{/* <div className='meter'>
<p>{hovered}</p>
  <DonutChart
    data={[
      {
        label: "work",
        value: workTime,
        className: "workmeter"
      },
      {
        label: "life",
        value: lifeTime,
        className: "meter"
      },
      {
          label:'',
          value: totalTime,
      }
    ]}
    height={100}
    width={200}
    startAngle={180}
    legend={false}
    colors={['#8a5858','#eddfc2']}
    strokeColor={['#ffffff', '#ffffff']}
    colorFunction={(colors, index) => colors[(index % colors.length)]}
    // formatValues={(values, total) => `${(values * 2 / total * 100).toFixed(1)}%`}
    formatValues={getValueFormat}
    clickToggle={false}
    onMouseEnter={(item) => {enterMeter(item)}}
  />
</div> */}
export default Meter;