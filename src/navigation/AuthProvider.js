import React, { createContext, useState, useContext } from "react";
import "@firebase/auth";
import "@firebase/firestore";
import firebase from "firebase/app";
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("User");
  const [displayName, setDisplayName] = useState("User");
  const [bio, setBio] = useState("I am Groot");
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        username,
        login: async (email, password) => {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        },
        register: async (email, password, un, display) => {
          setDisplayName(display); 
          setUsername(un);
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then((response) => {
                // Once the user creation has happened successfully, we can add the currentUser into firestore
                // with the appropriate details.
                const user = response.user;
                const uid = user.uid;
                user
                  .updateProfile({
                    displayName: display,
                    photoURL: "https://i.stack.imgur.com/l60Hf.png",
                  })
                  .then(() => {
                    console.log("set the display name");
                  })
                  .catch((error) => {
                    console.log(error);
                  });

                firebase
                  .firestore()
                  .collection("users")
                  .doc(uid)
                  .set({
                    storedDate: "2021-05-31",
                    bio: "I.am.Groot",
                    displayName: display,
                    photoURL: "https://i.stack.imgur.com/l60Hf.png",
                    username: un,
                    workTime: 0,
                    lifeTime: 0,
                    friends: [],
                  })
                  .then(() => {
                    console.log("set user data");
                  })
                  //ensure we catch any errors at this stage to advise us if something does go wrong
                  .catch((error) => {
                    console.log(
                      "Something went wrong with added user to firestore: ",
                      error
                    );
                  });

                firebase
                  .firestore()
                  .collection("usernames")
                  .doc(un)
                  .set({
                    username: un,
                  })
                  .then(() => {
                    console.log("set username");
                  })
                  .catch((error) => console.log(error));
              })
              //we need to catch the whole sign up process if it fails too.
              .catch((error) => {
                console.log("Something went wrong with sign up: ", error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
