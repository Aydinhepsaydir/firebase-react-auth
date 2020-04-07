import React from "react";
import { Route, Switch } from "react-router-dom";

import {
  AccountView,
  AdminView,
  HomeView,
  LandingView,
  PasswordForgetView,
  SignInView,
  SignUpView,
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/home" component={HomeView} />
      <Route exact path="/account" component={AccountView} />
      <Route exact path="/admin" component={AdminView} />
      <Route exact path="/" component={LandingView} />
      <Route exact path="/pw-forget" component={PasswordForgetView} />
      <Route exact path="/signin" component={SignInView} />
      <Route exact path="/signup" component={SignUpView} />
    </Switch>
  );
};

export default Routes;
