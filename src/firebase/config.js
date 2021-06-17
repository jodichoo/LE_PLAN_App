import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyArTY0IpvSluDGzSsaESw7V8M40sKI5F98",
//     authDomain: "wlbbot.firebaseapp.com",
//     projectId: "wlbbot",
//     storageBucket: "wlbbot.appspot.com",
//     messagingSenderId: "234811155240",
//     appId: "1:234811155240:web:fc63e7a5aa3d6a0a41661d",
//     measurementId: "G-5LYMT00251"
//   };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHVEgZAF13qqCmkAs-uoVXEz8t6ockCwQ",
  authDomain: "wlbbot-c1927.firebaseapp.com",
  projectId: "wlbbot-c1927",
  databaseURL: 'https://wlbbot-c1927.firebaseio.com',
  storageBucket: "wlbbot-c1927.appspot.com",
  messagingSenderId: "560679851",
  appId: "1:560679851:web:8b77914fcb57787bc4e0ee",
  measurementId: "G-B1X10HPT1E"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore(); 
export { firebase };