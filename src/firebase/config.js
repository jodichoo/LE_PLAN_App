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
  apiKey: "AIzaSyDecEux5fREYrO0x2F0QG8zFSanUD9HylA",
  authDomain: "wlbbot-fdd9e.firebaseapp.com",
  projectId: "wlbbot-fdd9e",
  databaseURL: 'https://wlbbot-fdd9e.firebaseio.com',
  storageBucket: "wlbbot-fdd9e.appspot.com",
  messagingSenderId: "142675589929",
  appId: "1:142675589929:web:1b330ab4e5456354ead538",
  measurementId: "G-JHG7BKEWQB"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore(); 
export { firebase };