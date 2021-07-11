import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import moment from "moment";
import { View, Text, StyleSheet } from "react-native";

function Greeting(props) {
  const { tasks, setTasks, selectedDate } = props;
  const { currentUser, username } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [greetName, setGreetName] = useState("empty");
  const [date, setDate] = useState(new Date());
  var storedDate;
  const currDate = moment();

  //get the username for custom greeting
  useEffect(() => {
    userTasks.get().then((doc) => {
      if (doc.exists) {
        //account details exist
        const unsubscribe = setGreetName(doc.data().username);
        return unsubscribe;
      } else {
        //account details do not exist, so initialise account details
        const unsubscribe = userTasks.set({
          username: username,
          workTime: 0, //for work-life meter
          lifeTime: 0, //for work-life meter
        });
        setGreetName(username);
        return unsubscribe;
      }
    });
  }, []);

  useEffect(() => {
    userTasks
      .get()
      .then((doc) => {
        if (doc.exists) {
          //account details exist
          setGreetName(doc.data().username);
          storedDate = doc.data().storedDate;
        }
      })
      .then(() => {
        console.log(`stored date is ${storedDate}`);
        updateMeterData();
      });

    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  async function handleGetMeterData(monDate) {
    var workCount = 0;
    var lifeCount = 0;

    for (var i = 0; i <= 6; i++) {
      const tempDate = moment(monDate);
      tempDate.add(i, "days"); //set date to next day of the week
      const str = tempDate.format("YYYY-MM-DD"); //to find tasks in database
      await userTasks
        .collection(str)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              const isWork = doc.data().isWork;
              const dur = doc.data().dur;
              if (isWork) {
                workCount += parseInt(dur);
              } else {
                lifeCount += parseInt(dur);
                console.log(lifeCount);
              }
            }
          });
        });
      userTasks.update({
        workTime: workCount,
        lifeTime: lifeCount,
      });
    }
  }

  function updateMeterData() {
    //check if current date is >6 days after the last stored monday date
    if (moment().diff(moment(storedDate, "YYYY-MM-DD"), "days") > 6) {
      //if so, find the monday date of the current week
      const whatday = currDate.day() === 0 ? 7 : currDate.day(); // 1,2,3,4....7
      const numDays = whatday - 1; // num of times to mathfloor
      const monDate = moment().subtract(numDays, "days").format("YYYY-MM-DD"); //monday of the current week

      updateStonks(monDate);

      userTasks
        .update({
          //update storedDate in database to limit reinitialisation
          storedDate: monDate,
        })
        .then(() => {
          return handleGetMeterData(monDate);
        });
    }
  }

  async function updateStonks(monDate) {
    const data = [];
    for (var i = 4; i > 0; i--) {
      var workCount = 0;
      var lifeCount = 0;

      for (var j = 0; j <= 6; j++) {
        const tempDate = moment(monDate, "YYYY-MM-DD").subtract(i, "week");
        tempDate.add(j, "days"); //set date to next day of the week
        const str = tempDate.format("YYYY-MM-DD"); //to find tasks in database
        await userTasks
          .collection(str)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                const isWork = doc.data().isWork;
                const dur = doc.data().dur;
                if (isWork) {
                  workCount += dur;
                } else {
                  lifeCount += dur;
                }
              }
            });
          });
      }

      const dataItem =
        workCount === 0 && lifeCount === 0
          ? -1
          : (100 * parseFloat(workCount)) /
            (parseFloat(workCount) + parseFloat(lifeCount));

      data.push(Math.round(dataItem * 100) / 100);
    }
    
    //update database
    userTasks
      .update({
        stonksData: data,
      })
      .then(() => {
        console.log("updated data");
      });
  }

  

  function convertGreet(num) {
    const time = parseInt(num.toLocaleTimeString("en-GB").split(":")[0]);
    if (time < 12) {
      return "Good Morning";
    } else if (time < 17) {
      return "Good Afternoon";
    } else if (time < 24) {
      return "Good Evening";
    } else {
      return "HAHAHAHAHAAH";
    }
  }

  function styleDate(date) {
    if (date === moment().format("YYYY-MM-DD")) {
      return "today";
    }
    return date;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greetText}>
        {date.toLocaleTimeString()} {convertGreet(date)},{" "}
        {currentUser.displayName}!
      </Text>
      <Text style={styles.statement}>
        {/* Here are your tasks for {date.toLocaleDateString()} ecksdee ecksdee */}
        Here are your tasks for {styleDate(selectedDate)}
      </Text>
      {/* <TaskManager selectedDate={selectedDate} tasks={tasks} setTasks={setTasks}/> */}
    </View>
  );
}

export default Greeting;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: 20,
    alignItems: "center",
  },

  greetText: {
    fontSize: 28,
  },

  statement: {
    fontSize: 18,
  },
});
