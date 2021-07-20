import React from "react";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Phone from "./Pages/Phone";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Agent from "./Pages/Agent";

function App() {
    return (
        <Router>
            <div className="App">
            <Header />
                <Switch>
                    <Route path="/agent/:agentId" component={Agent} />
                    <Route path="/call/:phoneNumber" component={Phone} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
