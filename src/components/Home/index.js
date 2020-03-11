import React from "react";

import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

const HomePage = props => {
  const { firebase } = props;

  return (
    <div>
      <h1>Home</h1>
      <p>Home page only accessible by signed in users.</p>
      {console.log("firebase.auth: \n", firebase.auth)}
    </div>
  );
};

// if auth user is null then cannot see this page !!
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition), withFirebase)(HomePage);
