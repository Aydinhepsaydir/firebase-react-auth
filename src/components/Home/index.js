import React, { Component } from "react";

import { withAuthorization } from "../Session";
import { withUser } from "../User";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    if (user == null) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Home</h1>
        <p>Welcome, {user.username}</p>
      </div>
    );
  }
}

// if auth user is null then cannot see this page !!
const condition = authUser => !!authUser;

export default compose(
  withUser,
  withAuthorization(condition),
  withFirebase
)(HomePage);
