import React, { Component } from "react";
import { compose } from "recompose";

import { withAuthorization } from "../../contexts/Session";
import { withUser } from "../../contexts/User";
import { withFirebase } from "../../contexts/Firebase";

class HomeView extends Component {
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
)(HomeView);
