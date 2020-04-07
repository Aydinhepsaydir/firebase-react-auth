import React from "react";
import UserProvider, { withUser, UserContext } from "./context";
// import withUser from "./withUser";

const User = () => (
  <div>
    <h1>User</h1>
  </div>
);

export default User;

//context
export { UserContext, withUser, UserProvider };
