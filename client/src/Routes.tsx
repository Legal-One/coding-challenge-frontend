import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Agent from './components/Agents'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/agent" component={Agent} />
  </Switch>
)

export default Routes
