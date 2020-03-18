import app from "firebase/app";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

var config = {
  apiKey: "AIzaSyBQ8kaEUeEmTbDNYAiDyJhyO3Xbpb8xOlI",
  authDomain: "fir-auth-react-2a2e0.firebaseapp.com",
  databaseURL: "https://fir-auth-react-2a2e0.firebaseio.com",
  projectId: "fir-auth-react-2a2e0",
  storageBucket: "fir-auth-react-2a2e0.appspot.com",
  messagingSenderId: "325579700751",
  appId: "1:325579700751:web:1adb3102b174377ad6817a"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Realtime Database User API ***
  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  getUser = uid =>
    this.db
      .ref(`users/${uid}`)
      .once("value")
      .then(snapshot => {
        const userObject = snapshot.val();
        return userObject;
      });

  // *** Realtime Database Groups API ***
  group = uid => this.db.ref(`groups/${uid}`);

  groups = () => this.db.ref("groups");

  getGroup = uid =>
    this.db
      .ref(`groups/${uid}`)
      .once("value")
      .then(snapshot => {
        const groupObject = snapshot.val();
        console.log("groupObject: \n", groupObject);
        return groupObject;
      })
      .catch(e => console.log(e));

  addUserToGroup = (groupId, userId) =>
    this.db.ref(`groups/${groupId}/users/${userId}`);
}

export default Firebase;

export { StyledFirebaseAuth, firebase };
