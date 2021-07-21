import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Phone from "./Pages/Phone";
import Agent from "./Pages/Agent";

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                    <Route path="/agent/:agentId" component={Agent} />
                    <Route path="/call/:phoneNumber" component={Phone} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
