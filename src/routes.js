import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

import App from "./App";
import Calls from "./components/Calls";
import Agents from "./components/Agents";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/call/:number" component={Calls} />
        <Route path="/agent/:id" component={Agents} />
      </Switch>
    </Router>
  );
};

export default Routes;
