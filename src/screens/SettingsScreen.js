import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import firebase from "firebase/app";

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

  function handleSetProfilePic() {
    setError("");
    setUrlError("");
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
    setError("");
    setUrlError("");
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
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}
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
        console.log("errorororor");
        setError("Failed to reauthenticate");
      });

    setUrlError("");
  }

  return (
      <View style={styles.container}>
        <View style={styles.header}><Text style={{fontSize: 48, fontWeight: '700'}}>Settings</Text></View>
        {/* <View className='back' onClick={history.goBack}><IoChevronBackOutline style={{fontSize: '20px'}}/><text>Back</text></div> */}
        
          {success.length > 0 && <View style={styles.msg}>
            <Text style={styles.succ}>{success}</Text>
            </View>}

          {urlError > 0 && <View style={styles.msg}>
            <Text style={styles.error}>{urlError}</Text>
            </View>}

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
            <Text style={{color: 'whitesmoke'}}>Set Picture</Text>
          </Pressable>
        </View>

        <Text style={styles.text}>Your Username: {username}</Text>

        <Text style={styles.text}>Your Email: {currentUser.email}</Text>

        <View style={styles.changeCreds}>
          <Pressable style={{marginVertical: 5}} onPress={() => setConfirmPassP(true)}>
            <Text style={{...styles.text, color: 'gray', textDecorationLine:'underline'}}>Change Password</Text>
          </Pressable>

          {error.length > 0 && changePass && (<View>
            <Text style={styles.error}>{error}</Text>
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

          <Pressable onPress={() => setConfirmPassN(true)}>
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
              {toggleAuth()}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: "center",
    marginTop: 50,
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
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  imgDef: {
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  input: {
    color: 'black',
    width: '70%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    height: 30, //typed text only shows with this??
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
    width: '25%',
    backgroundColor: 'turquoise',
  },
  cancelButton: {
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
    alignItems: 'center',
    width: '25%',
    backgroundColor: 'pink',
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
    backgroundColor: 'red',
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  error: {
    backgroundColor: "pink",
    color: "red",
  },
  succ: {
    backgroundColor: "lightgreen",
    color: "green",
  },
});
