import React from "react";

import SignInForm from "./SignInFormBase";
import { SignUpLink } from "../../views/SignUpView";
import { PasswordForgetLink } from "../../views/PasswordForgetView";

const SignInView = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default SignInView;
