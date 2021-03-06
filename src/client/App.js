import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './app.css';

import Logs from './componetns/Logs'
import Call from './componetns/Call';
import Agent from './componetns/Agent';
import NotFound404 from './componetns/NotFound404'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Logs} />
        <Route path="/call/:number" component={Call} />
        <Route path="/agent/:ID" component={Agent} />
        <Route path="*" exact component={NotFound404} />
      </Switch>
    </Router>
  )
}

export default App
