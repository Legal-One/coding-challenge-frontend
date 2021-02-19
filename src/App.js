import Home from "./components/home/Home";
import Agent from "./components/agent/Agent";
import Call from "./components/call/Call";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="main">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/agent/:id">
              <Agent />
            </Route>
            <Route path="/call/:number">
              <Call />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
