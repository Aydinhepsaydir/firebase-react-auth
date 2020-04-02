import React from "react";
import PasswordChangeForm from "./PasswordChange";

import { PasswordForgetForm } from "../../views/PasswordForgetView";
import { AuthUserContext, withAuthorization } from "../../contexts/Session";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

// if auth user is null then cannot see this page !!
const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
