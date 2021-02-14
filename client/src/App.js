import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Agent from "./components/Agent";
import Call from "./components/Call";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path="/" component={Home} exact />
        <Route path="/agent/:id" component={Agent} exact />
        <Route path="/call/:number" component={Call} exact />
      </div>
    </Router>
  );
}

export default App;
