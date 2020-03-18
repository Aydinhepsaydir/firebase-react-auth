import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { withUser } from "../User";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

const INITIAL_STATE = {
  groupName: "",
  error: null
};

class StartGroupForm extends Component {
  constructor(props) {
    super();

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { groupName } = this.state;
    const { user, firebase } = this.props;
    const time = new Date().getTime();

    const groupId = (groupName + "-" + time).toString();
    const userId = firebase.auth.currentUser.uid;

    if (user.groupId) {
      alert("You are already a part of a group.");
    }

    this.props.firebase
      .group(groupId)
      .set({
        groupName: groupName,
        users: []
      })
      .catch(e => console.log(e))
      .then(
        firebase
          .addUserToGroup(groupId, userId)
          .set({ ...user })
          .catch(e => console.log(e))
      )
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        //withRouter() gives history prop from react-router
        //history allows us to redirect user to another page by pushing a route to it
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const isInvalid = this.groupName === "";

    return (
      <div>
        <h1>this is the start a group form</h1>
        <form onSubmit={this.onSubmit}>
          <input
            name="groupName"
            value={this.groupName}
            onChange={this.onChange}
            type="text"
            placeholder="Group Name"
          />
          <button type="submit" disabled={isInvalid}>
            Start Group
          </button>
        </form>
      </div>
    );
  }
}

export default compose(withRouter, withUser, withFirebase)(StartGroupForm);
