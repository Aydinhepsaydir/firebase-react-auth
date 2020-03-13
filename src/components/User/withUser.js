import React from "react";
import UserContext from "./context";
import { withFirebase } from "../Firebase";

const withUser = Component => {
  class WithUser extends React.Component {
    constructor(props) {
      super(props);
      this.firebase = this.props.firebase;

      this.state = {
        user: {}
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        async authUser => {
          const userId = authUser.uid;
          const user = await this.firebase.getUser(userId);
          this.setState({
            user: user
          });
          console.log("USER: \n", this.state.user);
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <UserContext.Consumer>
          {user => <Component {...this.props} user={user} />}
        </UserContext.Consumer>
      );
    }
  }

  return withFirebase(WithUser);
};

export default withUser;
