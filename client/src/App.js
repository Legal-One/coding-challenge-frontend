import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Agent from "./components/Agent";
import Call from "./components/Call";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Home} exact />
        <Route path="/agent/:id" component={Agent} exact />
        <Route path="/call/:number" component={Call} exact />
      </div>
    </Router>
  );
}

export default App;
