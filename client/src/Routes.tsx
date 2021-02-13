import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Agent from './components/Agents'
import Logs from './pages/Logs'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/agent" component={Agent} />
    <Route exact path="/logs" component={Logs} />
  </Switch>
)

export default Routes
