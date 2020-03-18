import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { withUser } from "../User";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const INITIAL_STATE = {
  groupId: "",
  error: null
};

class JoinGroupForm extends Component {
  constructor(props) {
    super();

    this.checkForGroup = this.checkForGroup.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    console.log(this.state.groupId);
  }

  async checkForGroup() {
    const { firebase } = this.props;
    const { groupId } = this.state;
    const group = await firebase.getGroup(groupId);

    if (group) {
      return group;
    } else {
      alert("Group does not exist. Please try again.");
    }
  }

  onSubmit(event) {
    const { groupId } = this.state;
    const { user, firebase } = this.props;
    const userId = firebase.auth.currentUser.uid;

    this.checkForGroup()
      .then(group => {
        console.log("group.users: \n", group);
        if (group.users.hasOwnProperty(userId)) {
          alert("You are already in this group.");
        } else {
          firebase
            .addUserToGroup(groupId, userId)
            .set({ ...user })
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const isInvalid = this.groupId === "";

    return (
      <div>
        <h1>this is the join a group form</h1>
        <form onSubmit={this.onSubmit}>
          <input
            name="groupId"
            value={this.groupName}
            onChange={this.onChange}
            type="text"
            placeholder="Group ID"
          />
          <button type="submit" disabled={isInvalid}>
            Join Group
          </button>
        </form>
        {/* <button onClick={this.onSubmit} /> */}
      </div>
    );
  }
}

export default compose(withFirebase, withRouter, withUser)(JoinGroupForm);
