import firebase from "firebase/app";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyCkcvWK4k83TLTbJxADyQkxw-H80HwQtvs",
  authDomain: "todos-1247b.firebaseapp.com",
  projectId: "todos-1247b"
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export default db;
