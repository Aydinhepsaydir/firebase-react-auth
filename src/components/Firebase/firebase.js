import app from "firebase/app";
import "firebase/auth";

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
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
