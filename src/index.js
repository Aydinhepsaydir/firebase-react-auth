import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Layout from "./Layout";
import Firebase, { FirebaseContext } from "./contexts/Firebase";
import { UserProvider } from "./contexts/User";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <UserProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </UserProvider>
  </FirebaseContext.Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
