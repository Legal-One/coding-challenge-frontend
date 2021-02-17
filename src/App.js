import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      greeting: "",
      logs: []
    };
    this.handleCall = this.handleCall.bind(this);
    this.handleAgent = this.handleAgent.bind(this);
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.json())
      .then(res => {
        this.setState({ logs: res });
      });
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleAgent(event) {
    event.preventDefault();
    const ID = "356b03dc-9ec5-11e7-97a6-d501104f897e";
    fetch(`/agent?id=${encodeURIComponent(ID)}`)
      .then(res => res.json())
      .then(res => {
        console.log("agent->", res);
      });
  }

  handleCall(event) {
    event.preventDefault();
    const number = "+49158544147";
    fetch(`/call?number=${encodeURIComponent(number)}`)
      .then(res => res.json())
      .then(res => {
        console.log("number->", res);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h3>Front-end Test</h3>
          <button onClick={this.handleCall}>Test</button>
        </header>
      </div>
    );
  }
}

export default App;
