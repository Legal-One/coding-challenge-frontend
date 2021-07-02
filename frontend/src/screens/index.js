import React from 'react'
import { Route, Switch } from 'react-router-dom'

// imports for the screens
import DashBoard from './dashboard'
import Customer from './customer'
import Agent from './agent'
import { ROUTES } from '../routes'
import AgentList from './agentList'

function EntryPoint(props) {
  return (
    <Switch>
      <Route path={ROUTES.DASHBOARD} component={DashBoard} exact />
      <Route path={`${ROUTES.CALL}/:number`} component={Customer} />
      <Route path={`${ROUTES.AGENT}/:id`} component={Agent} />
      <Route path={ROUTES.AGENT} component={AgentList} />
    </Switch>
  )
}

export default EntryPoint
