import React from "react";
import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

//gives access to firebase instance
export default withFirebase(SignOutButton);
