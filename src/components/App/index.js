import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingView from "../../views/LandingView";
import SignUpView from "../../views/SignUpView";
import SignInView from "../../views/SignInView";
import PasswordForgetView from "../../views/PasswordForgetView";
import HomeView from "../../views/HomeView";
import AccountView from "../../views/AccountView";

import * as ROUTES from "../../constants/routes";
import { render } from "@testing-library/react";

import { withAuthentication } from "../../contexts/Session";
import AdminView from "../../views/AdminView";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingView} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpView} />
        <Route exact path={ROUTES.SIGN_IN} component={SignInView} />
        <Route
          exact
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetView}
        />
        <Route exact path={ROUTES.HOME} component={HomeView} />
        <Route exact path={ROUTES.ACCOUNT} component={AccountView} />
        <Route exact path={ROUTES.ADMIN} component={AdminView} />
      </div>
    </Router>
  );
};

export default withAuthentication(App);
