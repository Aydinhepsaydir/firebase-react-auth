import React from "react";

import { withAuthorization } from "../Session";

const HomePage = () => (
  <div>
    <h1>Home</h1>
    <p>Home page only accessible by signed in users.</p>
  </div>
);

// if auth user is null then cannot see this page !!
const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
