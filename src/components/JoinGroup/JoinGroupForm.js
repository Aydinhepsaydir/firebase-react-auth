import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";

const INITIAL_STATE = {
  groupId: "",
  error: null
};

class JoinGroupForm extends Component {
  constructor(props) {
    super();

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    // const { groupName } = this.state;
    // this.props.firebase
    //   .catch(e => console.log(e))
    //   .then(() => {
    //     this.setState({ ...INITIAL_STATE });
    //     //withRouter() gives history prop from react-router
    //     //history allows us to redirect user to another page by pushing a route to it
    //     this.props.history.push(ROUTES.JOIN_GROUP);
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //   });
    // event.preventDefault();
  };

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
      </div>
    );
  }
}

export default JoinGroupForm;
