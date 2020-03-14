import React, { Component } from "react";
import { withFirebase } from "../Firebase";

const UserContext = React.createContext(null);

class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const { firebase } = this.props;

    this.listener = firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser !== null) {
        const userId = authUser.uid;
        const user = await firebase.getUser(userId);
        this.setState({
          user: user
        });
      }
      console.log("USER: \n", this.state.user);
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { children } = this.props;
    const { user } = this.state;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

// export const withUser = Component => props => (
//   <UserContext.Consumer>
//     {user => <Component {...props} user={user} />}
//   </UserContext.Consumer>
// );

const withUser = Component => {
  return props => {
    return (
      <UserContext.Consumer>
        {user => {
          return <Component user={user} {...props} />;
        }}
      </UserContext.Consumer>
    );
  };
};

export default withFirebase(UserProvider);
export { UserContext, withUser };
