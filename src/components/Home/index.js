import React, { Component } from "react";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.firebase = this.props.firebase;
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome, {this.props.firebase.auth.currentUser.displayName}</p>
      </div>
    );
  }
}

// if auth user is null then cannot see this page !!
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition), withFirebase)(HomePage);
