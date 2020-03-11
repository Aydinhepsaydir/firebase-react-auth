import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

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
    this.cloudDb = app.firestore();
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

  // *** Cloud Firestore User API ***
  cloudUser = uid => this.cloudDb.collection("users").doc(uid.toString());

  cloudUsers = () => this.cloudDb.collection("users");
}

export default Firebase;
