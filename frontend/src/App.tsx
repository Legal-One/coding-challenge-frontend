import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./views/home";
import CallLog from "./views/callLog";
import AgentLog from "./views/agentLog"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/agent/:agentId">
          <AgentLog />
        </Route>
        <Route path="/call/:selectedNum">
          <CallLog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>    
  );
}

export default App;
