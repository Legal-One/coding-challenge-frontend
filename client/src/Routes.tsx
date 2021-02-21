import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Agents from './pages/Agents'
import { useLogs } from './Hooks/useLogs'
import { useAgents } from './Hooks/useAgents'
import { useResolution } from './Hooks/useResolution'
import AgentLog from './components/AgentLog'
import NumberLog from './components/NumberLog'

const Routes = () => {
  const [logsData] = useLogs()
  const [agentData] = useAgents()
  const [resData] = useResolution()
  console.log(resData, logsData, agentData)
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/agent" component={() => <Agents agents={agentData} />} />
      <Route path="/agentlog/:identifier" component={AgentLog} />
      <Route path="/numberlog/:identifier" component={NumberLog} />
    </Switch>
  )
}

export default Routes
