import React, { Component } from "react";

import { withAuthorization } from "../Session";
import { withUser } from "../User";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.firebase = this.props.firebase;
    this.user = this.props.user;
  }

  // async componentWillMount() {
  //   const userId = this.firebase.auth.currentUser.uid;
  //   const user = await this.firebase.getUsername(userId);
  //   this.setState({
  //     username: user.username
  //   });
  //   console.log(user);
  // }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
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
