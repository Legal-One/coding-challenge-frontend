import logo from './logo.svg';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from "./component/home";
import Agent from './component/agent';
import AgentNumber from './component/agentNumber';
import NotFound from './component/notFound';

function App() {
  return (
    <div>
    <Switch>
      <Route exact path="/agent/:id" component={Agent}/>
      <Route exact path="/call/:number" component={AgentNumber}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Notfound" component={NotFound}/>
      <Redirect to="/NotFound" />
    </Switch>
    </div>
  );
}

export default App;
