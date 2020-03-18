import React, { Component } from "react";

import { withAuthorization } from "../Session";
import { withUser } from "../User";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  checkForGroup = user => {
    if (user.groupId) {
      return <p>Cool group...</p>;
    } else {
      return <p>You are not part of a group yet...</p>;
    }
  };

  render() {
    const { user } = this.props;
    console.log(user);

    if (user == null) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Home</h1>
        <p>Welcome, {user.username}</p>
        {this.checkForGroup(user)}
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
