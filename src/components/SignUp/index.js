import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withFirebase, firebase } from "../Firebase";
import { compose } from "recompose";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log(authUser);
        // create user in realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({ username, email });
      })
      .catch(e => console.log(e))
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //withRouter() gives history prop from react-router
        //history allows us to redirect user to another page by pushing a route to it
        this.props.history.push(ROUTES.JOIN_GROUP);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  uiConfig = () => {
    return {
      signInFlow: "redirect",
      signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccess: () => this.addFbUserToRealTime()
      }
    };
  };

  addFbUserToRealTime = () => {
    const { currentUser } = this.props.firebase.auth;
    const { uid } = currentUser;

    this.props.firebase.users().once("value", snapshot => {
      const usersObject = snapshot.val();
      if (!usersObject.hasOwnProperty(uid)) {
        this.props.firebase
          .user(uid)
          .set({ username: currentUser.displayName, email: currentUser.email })
          .then(this.props.history.push(ROUTES.JOIN_GROUP));
      } else {
        return this.props.history.push(ROUTES.HOME);
      }
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const isInvalid =
      this.passwordOne !== this.passwordTwo ||
      this.passwordOne === "" ||
      this.email === "" ||
      this.username === "";

    return (
      <form onSubmit={this.onSubmit}>
        {/* controlled components */}
        <input
          name="username"
          value={this.username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={this.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={this.passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={this.passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>
        {this.error && <p>{this.error.message}</p>}

        <StyledFirebaseAuth
          uiConfig={this.uiConfig()}
          firebaseAuth={this.props.firebase.auth}
        />
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

//HIGHER ORDER COMPONENTS
//withRouter gives react-router functionality
//withFirebase gives firebase functionality
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
