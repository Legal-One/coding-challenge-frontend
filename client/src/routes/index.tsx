import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Agent from '../components/Agent'
import Call from '../components/Call'

export default function Routes() {
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/agent/:agentId'} component={Agent} />
      <Route exact path={'/call/:number'} component={Call} />
    </Switch>
  )
}
