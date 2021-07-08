import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useAuth } from "../navigation/AuthProvider";
import firebase from "firebase/app";

function SettingsScreen() {
  const { currentUser } = useAuth();
  const userTasks = db.collection("users").doc(currentUser.uid);
  const [username, setUsername] = useState("");
  const [changePass, setChangePass] = useState(false);
  const [confirmPassP, setConfirmPassP] = useState(false);
  const [confirmPassN, setConfirmPassN] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [changeName, setChangeName] = useState(false);
  const [newName, setNewName] = useState("");
  const [picUrl, setPicUrl] = useState("");

  useEffect(() => {
    userTasks.get().then((doc) => setUsername(doc.data().username));
  }, []);

  function handleSetProfilePic() {
    currentUser
      .updateProfile({
        photoURL: picUrl,
      })
      .then(() => {
        setSuccess("Successfully changed profile picture!");
        setPicUrl("");
      })
      .catch((error) => {
        setError("Failed to set profile picture, please check the image url");
      });
  }

  function handleChangePassword() {
    if (newPassword !== confPassword) {
      setError("Passwords do not match!");
    } else if (newPassword.length < 6 && confPassword.length < 6) {
      setError("Password must be at least 6 characters long");
    } else {
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
    currentUser
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        setSuccess("Successfully changed display name!");
      })
      .catch((error) => {
        setError("Failed to set profile picture, please check the image url");
      });
  }

  function toggleAuth() {
    return (
      <View>
        <Text>{error && <Text style={styles.error}>{error}</Text>}</Text>
        <Text>Confirm Current Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          type="password"
          onChangeText={(e) => setOldPassword(e)}
        />
        <Pressable onPress={toggleUpdate}>
          <Text>Submit</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setError("");
            setConfirmPassP(false);
            setConfirmPassN(false);
          }}
        >
          <Text>X</Text>
        </Pressable>
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
  }

  const profilePicStyle = {
    height: "200px",
    width: "250px",
    borderRadius: "100px",
  };

  return (
    <View style={styles.container}>
      {/* <View className='back' onClick={history.goBack}><IoChevronBackOutline style={{fontSize: '20px'}}/><text>Back</text></div> */}
      <Text>{success && <Text>{success}</Text>}</Text>
      {/* <img
        style={profilePicStyle}
        src={currentUser.photoURL}
        onError={(e) => {
          e.target.onError = null;
          e.target.src = "https://i.stack.imgur.com/l60Hf.png";
        }}
      /> */}
      <Image
        style={styles.image}
        source={{
          uri: currentUser.photoURL,
        }}
      />

      <Text>Upload Profile Picture URL</Text>
      <View style={styles.setPic}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => setPicUrl(e)}
          placeholder="e.g. pic.png, pic.jpg"
        />

        <Pressable onPress={handleSetProfilePic}>
          <Text>Set Picture</Text>
        </Pressable>
      </View>
      <Text>Your Username: {username}</Text>

      <Text>Your Email: {currentUser.email}</Text>

      <Pressable onPress={() => setConfirmPassP(true)}>
        <Text>Change Password</Text>
      </Pressable>

      <Text>{error && changePass && <Text style={styles.error}>{error}</Text>}</Text>
      
      {changePass && (
        <View>
          <Text>New password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(e) => setNewPassword(e)}
          />

          <Text>Confirm new password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(e) => setConfPassword(e)}
            required
          ></TextInput>

          <Pressable onPress={handleChangePassword}>
            <Text>Submit</Text>
          </Pressable>
          <Pressable onPress={() => setChangePass(false)}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      )}

      <Pressable onPress={() => setConfirmPassN(true)}>
        <Text>Change Display Name</Text>
      </Pressable>

      {changeName && (
        <View>
          <Text>New Display Name:</Text>
          <TextInput style={styles.input} onChange={(e) => setNewName(e)} />
          <Pressable onPress={handleChangeName}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      )}

      <Modal transparent={true} visible={confirmPassN || confirmPassP}>
        <TouchableOpacity
          onPress={() => {
            setConfirmPassN(false);
            setConfirmPassP(false);
          }}
          style={{ backgroundColor: "#000000aa", flex: 1 }}
        >
          {/* to implement touch outside => remove modal */}
          <TouchableOpacity
            onPress={() => console.log("")}
            activeOpacity={1}
            style={{
              backgroundColor: "whitesmoke",
              margin: 50,
              padding: 40,
              borderRadius: 10,
              flex: 1,
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
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  input: {
    padding: 1,
    borderRadius: 10,
    height: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  setPic: {
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: 'row'
  },
  error: {
    alignSelf: 'center', 
    backgroundColor:'pink',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    color: 'red'
  }
});
