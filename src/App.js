import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingView from "./views/LandingView";
import SignUpView from "./views/SignUpView";
import SignInView from "./views/SignInView";
import PasswordForgetView from "./views/PasswordForgetView";
import HomeView from "./views/HomeView";
import AccountView from "./views/AccountView";

import Routes from "./Routes";
import { render } from "@testing-library/react";

import { withAuthentication } from "./contexts/Session";
import AdminView from "./views/AdminView";

const App = () => {
  return (
    <>
      <Routes />
    </>
  );
};

export default withAuthentication(App);
