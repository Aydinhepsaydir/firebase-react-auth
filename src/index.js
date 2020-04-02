import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./contexts/Firebase";
import { UserProvider } from "./contexts/User";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <UserProvider>
      <App />
    </UserProvider>
  </FirebaseContext.Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
