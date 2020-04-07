import React, { Component } from "react";
import { withFirebase, firebase } from "../../contexts/Firebase";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router-dom";

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
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        //withRouter() gives history prop from react-router
        //history allows us to redirect user to another page by pushing a route to it
        this.props.history.push(ROUTES.HOME);
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
        signInSuccess: () => this.addToRealtime()
      }
    };
  };

  addToRealtime = () => {
    const { currentUser } = this.props.firebase.auth;
    const { uid } = currentUser;

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();
      if (!usersObject.hasOwnProperty(uid)) {
        this.props.firebase
          .user(uid)
          .set({ username: currentUser.displayName, email: currentUser.email })
          .then(this.props.history.push(ROUTES.HOME));
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

//HIGHER ORDER COMPONENTS
//withRouter gives react-router functionality
//withFirebase gives firebase functionality
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUpForm;
