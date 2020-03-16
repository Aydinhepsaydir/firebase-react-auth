import React, { Component } from "react";

import { withAuthorization } from "../Session";

import JoinGroupForm from "./JoinGroupForm";
import StartGroupForm from "./StartGroupForm";

const JoinGroupPage = () => {
  return (
    <div>
      <h1>Join Group Page</h1>
      <h2>Do you already have a group in mind?</h2>
      <p>If so, enter the unique code below...</p>

      <JoinGroupForm />

      <p>
        Or, start your own group and send your friends the unique identifier!
      </p>

      <StartGroupForm />
    </div>
  );
};

// if auth user is null then cannot see this page !!
const condition = authUser => !!authUser;

export default withAuthorization(condition)(JoinGroupPage);
