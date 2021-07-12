import React, { useEffect, useState } from "react";
import { useAuth } from "../navigation/AuthProvider";
import { db } from "../firebase/config";
import { Text, TouchableOpacity, View, Image } from "react-native";

function ProfileScreen() {
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [dataSet, setDataSet] = useState([]);
  const [workSet, setWorkSet] = useState([]);
  const [playSet, setPlaySet] = useState([]);
  const [useDefault, setUseDefault] = useState(false);
  const [username, setUsername] = useState('default'); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    userTasks
      .get()
      .then((doc) => {
        setUsername(doc.data().username); 
      })
      .then(() => {
        setLoading(false); 
      })
  }, [])

  useEffect(() => {
    userTasks
      .get()
      .then((doc) => {
        const temp = doc.data().stonksData;
        const arr = [];

        for (var i = 0; i < temp.length; i++) {
          arr.push(temp[i]);
        }

        const workCount = doc.data().workTime;
        const lifeCount = doc.data().lifeTime;
        const dataItem =
          workCount === 0 && lifeCount === 0
            ? -1
            : (100 * parseFloat(workCount)) /
              (parseFloat(workCount) + parseFloat(lifeCount));

        arr.push(Math.round(dataItem * 100) / 100);
        setDataSet(arr);
      })
      .then(() => {
        setWorkSet(convertToWork());
        setPlaySet(convertToPlay());
      });
  }, []);

  function convertToWork() {
    const arr = dataSet;
    const converted = [];

    for (var i = 0; i < dataSet.length; i++) {
      if (arr[i] < 0) {
        converted.push(0);
      } else {
        converted.push(arr[i]);
      }
    }

    return converted;
  }

  function convertToPlay() {
    const arr = dataSet;
    const converted = [];

    for (var i = 0; i < dataSet.length; i++) {
      const curr = arr[i];
      if (curr === -1) {
        converted.push(0);
      } else {
        const n = 100 - parseFloat(curr);
        converted.push(Math.round(n * 100) / 100);
      }
    }
    
    return converted;
  }

  function renderImage() {
    fetch(currentUser.photoURL)
      .then((res) => {
        if (res.status == 200) {
          setUseDefault(false);
        }
      })
      .catch((error) => {
        setUseDefault(true);
      });
    return useDefault ? (
      <Image
        style={styles.img}
        source={require("../../assets/defaultProfile.png")}
      />
    ) : (
      <Image
        style={styles.img}
        source={{ uri: currentUser.photoURL }}
        onError={(e) => {
          setUseDefault(true);
        }}
      />
    );
  }
      
  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={{fontSize: 48, fontWeight: '700'}}>Profile</Text></View>
      {loading || <View style={styles.profile}>
        
        <View style={styles.imgContainer}>
          {renderImage()}
        </View>
        <Text style={styles.displayName}>{currentUser.displayName}</Text>
        <Text style={styles.creds}>
          Un: {username}
        </Text>
        <Text style={styles.creds}>
          Email: {currentUser.email}
        </Text>
      </View>}
      <View style={styles.stonks}>
        <Text>Can put the stonks here</Text>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = {
  container: { 
    alignItems: 'center',
    flex: 1, 
    marginTop: 50,
  },
  header: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  }, 
  profile: {
    alignItems: 'center',
  },
  displayName: {
    fontSize: 45,
    fontWeight: '600'
  },  
  imgContainer: {
    backgroundColor: 'white',
    width: 200, 
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
  creds: {
    fontWeight: '300',
    color: 'gray',
    fontSize: 20,
  }, 
  stonks: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
    borderStyle: 'solid',
    borderColor: 'black', 
    borderWidth: 1.4, 
  }
}
