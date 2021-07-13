import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import firebase from "firebase/app";
import RangeSlider from 'react-native-range-slider-expo';
import { Ionicons, Feather } from '@expo/vector-icons'; 

function SettingsScreen(props) {
  const { currentUser } = useAuth();
  const { setDef } = props;
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [username, setUsername] = useState("");
  const [changePass, setChangePass] = useState(false);
  const [confirmPassP, setConfirmPassP] = useState(false);
  const [confirmPassN, setConfirmPassN] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [changeName, setChangeName] = useState(false);
  const [newName, setNewName] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [useDefault, setUseDefault] = useState(true);
  const [urlError, setUrlError] = useState('');
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState([25, 75]);

  useEffect(() => {
    setError("");
    setUrlError("");
    setSuccess("");
  }, []);

  useEffect(() => {
    userTasks
      .get()
      .then((doc) => {
        setUsername(doc.data().username);
        if (doc.data().targetWorkRange !== undefined) {
          setRange(doc.data().targetWorkRange);
        } 
      })
      .then(() => {
        setLoading(false);
        setError("");
        setSuccess("");
      });

    fetch(currentUser.photoURL)
      .then((res) => {
        if (res.status == 404) {
          setUseDefault(true);
        } else {
          setUseDefault(false);
        }
      })
      .catch((error) => {
        console.log("failed to fetch validity of URL", error);
      });
  }, [picUrl]);

  function resetNotifs() {
    setError("");
    setUrlError("");
    setSuccess(''); 
  }

  function renderNotif(type) {
    const icon = type === success
      ? <Ionicons name="ios-checkmark-sharp" size={24} color="turquoise" />
      : <Feather name="x" size={24} color="pink" />

    return (
      type.length > 0 && 
        <View style={styles.msg}>
          {icon}
          <Text style={styles.notif}>{type}</Text>
        </View>
    )
  }

  function handleSetProfilePic() {
    resetNotifs(); 
    fetch(picUrl)
      .then((res) => {
        if (res.status == 200) {
          currentUser
            //update personal profile
            .updateProfile({
              photoURL: picUrl,
            })
            .then(() => {
              //update in firestore for other users to access
              userTasks
                .update({
                  photoURL: picUrl,
                })
                .then(() => {
                  setError("");
                  setSuccess("Successfully changed profile picture!");
                  setPicUrl("");
                  setUseDefault(false);
                  setDef(false);
                  console.log("success");
                });
            })
            .catch((error) => {
              setUrlError(
                "Failed to set profile picture, please check the image url"
              );
            });
        }
      })
      .catch((error) => {
        setPicUrl("");
        setUrlError(
          "Invalid URL provided. Please ensure photo is in the correct format and valid."
        );
      });
  }

  function handleChangePassword() {
    resetNotifs(); 
    if (newPassword !== confPassword) {
      setError("Passwords do not match!");
    } else if (newPassword.length < 6 && confPassword.length < 6) {
      setError("Password must be at least 6 characters long");
    } else {
      setUrlError("");
      setError("");
      currentUser
        .updatePassword(newPassword)
        .then(() => {
          setChangePass(false);
          setSuccess("Successfully changed password!");
          console.log("update successful");
        })
        .catch((error) => {
          setError("Failed to change password");
        });
    }
  }

  function handleChangeName() {
    resetNotifs();  
    currentUser
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        userTasks
          .update({
            displayName: newName,
          })
          .then(() => {
            setChangeName(false);
            setSuccess("Successfully changed display name!");
          });
      })
      .catch((error) => {
        setError("Failed to set new Display Name");
        setUseDefault(true);
      });
  }

  function toggleAuth() {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
        <Text style={styles.text}>Confirm Current Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          type="password"
          onChangeText={(e) => setOldPassword(e)}
        />
        <Pressable style={styles.setButton} onPress={toggleUpdate}>
          <Text style={{color: 'whitesmoke'}}>Submit</Text>
        </Pressable>
        {/* <Pressable
          onPress={() => {
            setUrlError("");
            setError("");
            setConfirmPassP(false);
            setConfirmPassN(false);
          }}
        >
          <Text>X</Text>
        </Pressable> */}
      </View>
    );
  }

  function toggleUpdate() {
    var credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );

    // Prompt the user to re-provide their sign-in credentials
    currentUser
      .reauthenticateWithCredential(credential)
      .then(function () {
        // User re-authenticated.
        confirmPassP ? setChangePass(true) : setChangeName(true);
        setConfirmPassP(false);
        setConfirmPassN(false);
        setError("");
      })
      .catch(function (error) {
        // An error happened.
        console.log(oldPassword);
        setError("Failed to reauthenticate");
      });

    setUrlError("");
  }

  function handleSetTarget() {
    resetNotifs(); 
    userTasks
      .set({
        targetWorkRange: range
      }, { merge: true })
      .then(() => {
        setSuccess('Successfully changed target range');
      })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}><Text style={{fontSize: 48, fontWeight: '700'}}>Settings</Text></View>
        {/* <View className='back' onClick={history.goBack}><IoChevronBackOutline style={{fontSize: '20px'}}/><text>Back</text></div> */}
        
          {renderNotif(success)}
          {renderNotif(urlError)}

        {useDefault ? (
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
              setDef(true);
            }}
          />
        )}

        <View style={styles.setPic}>
          <Text style={styles.text}>Upload Profile Picture URL</Text>
          <TextInput
              style={styles.input}
              onChangeText={(e) => setPicUrl(e)}
              placeholder="e.g. pic.png, pic.jpg"
              value={picUrl}
          />

          <Pressable style={styles.setButton} onPress={handleSetProfilePic}>
            <Text>Set Picture</Text>
          </Pressable>
        </View>

        <View style={{width: '100%', alignItems: 'center', marginBottom: 15}}>
          <Text style={styles.text}>Set Target Work Range: </Text>
          {console.log(range)}
          <View style={{width: '75%'}}>
            <RangeSlider min={0} max={100}
              fromValueOnChange={value => setRange(r => [value, r[1]])}
              toValueOnChange={value => setRange(r => [r[0], value])}
              initialFromValue={range[0]}
              initialToValue={range[1]}
              fromKnobColor={'grey'}
              toKnobColor={'grey'}
              inRangeBarColor={'pink'}
              />
          </View>
          <Pressable style={{...styles.cancelButton, marginTop: -43}} onPress={handleSetTarget}>
            <Text>Set {range[0]}%-{range[1]}%</Text>
          </Pressable>
        </View>

        <Text style={styles.text}>Your Username: {username}</Text>

        <Text style={styles.text}>Your Email: {currentUser.email}</Text>

        <View style={styles.changeCreds}>
          <Pressable style={{marginVertical: 5}} onPress={() => {resetNotifs(); setConfirmPassP(true);}}>
            <Text style={{...styles.text, color: 'gray', textDecorationLine:'underline'}}>Change Password</Text>
          </Pressable>

          {error.length > 0 && changePass && (<View style={styles.msg}>
            <Feather name="x" size={24} color="pink" />
            <Text style={styles.notif}>{error}</Text>
            </View>)}

          {changePass && (
            <View style={styles.changeForm}>
              <Text style={styles.text}>New password:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(e) => setNewPassword(e)}
              />

              <Text style={styles.text}>Confirm new password:</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(e) => setConfPassword(e)}
              ></TextInput>
              
              <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-evenly'}}>
                <Pressable style={styles.setButton} onPress={handleChangePassword}>
                  <Text>Submit</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={() => setChangePass(false)}>
                  <Text>Cancel</Text>
                </Pressable>
              </View>
            </View>
          )}

          <Pressable onPress={() => {resetNotifs(); setConfirmPassN(true);}}>
            <Text style={{...styles.text, color: 'gray', textDecorationLine:'underline'}}>Change Display Name</Text>
          </Pressable>

          {changeName && (
            <View style={styles.changeForm}>
              <Text style={styles.text}>New Display Name:</Text>
              <TextInput style={styles.input} onChangeText={(e) => setNewName(e)} />
              <View style={{flexDirection: 'row', width: '80%', justifyContent: 'space-evenly'}}>
                <Pressable style={styles.setButton} onPress={handleChangeName}>
                  <Text>Submit</Text>
                </Pressable>
                <Pressable style={styles.cancelButton} onPress={() => setChangeName(false)}>
                  <Text>Cancel</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <Modal transparent={true} visible={confirmPassN || confirmPassP}>
          <TouchableOpacity
            onPress={() => {
              setConfirmPassN(false);
              setConfirmPassP(false);
            }}
            style={{ backgroundColor: "#000000aa", flex: 1, justifyContent: 'center'}}
          >
            {/* to implement touch outside => remove modal */}
            <TouchableOpacity
              onPress={() => console.log("")}
              activeOpacity={1}
              style={{
                backgroundColor: "whitesmoke",
                margin: 50,
                borderRadius: 10,
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {renderNotif(error)}
              {toggleAuth()}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    paddingBottom: 50,
  },
  header: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
  }, 
  text: {
    fontSize: 16, 
    fontWeight: '500',
  }, 
  img: {
    width: 200,
    height: 200,
    borderRadius: 125,
  },
  imgDef: {
    width: 200,
    height: 200,
    borderRadius: 125,
  },
  input: {
    color: 'black',
    width: '70%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    height: 30, //typed text only shows with this??
    borderColor: 'black', 
    borderStyle: 'solid', 
    borderWidth: 1, 
  },
  setPic: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "column",
  },
  setButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    alignItems: 'center',
    width: '31%',
    backgroundColor: 'turquoise',
    borderColor: 'black', 
    borderStyle: 'solid', 
    borderWidth: 1, 
  },
  cancelButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    alignItems: 'center',
    width: '31%',
    backgroundColor: 'pink',
    borderColor: 'black', 
    borderStyle: 'solid', 
    borderWidth: 1, 
  },
  changeCreds: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  changeForm: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  msg: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'flex-start',
    width: "90%",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.4,
    marginBottom: 5,
  },
  notif: {
    marginLeft: 5,
    flex: 1,
    fontSize: 13, 
    fontWeight: '600',
  }
});
