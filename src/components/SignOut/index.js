import React from "react";
import { withFirebase } from "../../contexts/Firebase";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { compose } from "recompose";

const SignOutButton = props => {
  const { firebase } = props;

  return (
    <button
      type="button"
      onClick={() => {
        firebase.doSignOut();
      }}
    >
      Sign Out
    </button>
  );
};

//gives access to firebase instance
export default compose(withRouter, withFirebase)(SignOutButton);
