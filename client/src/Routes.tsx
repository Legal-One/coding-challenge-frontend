import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Agents from './pages/Agents'
import Logs from './pages/Logs'
import { useLogs } from './Hooks/useLogs'
import { useAgents } from './Hooks/useAgents'
import AgentLog from './components/AgentLog'
import NumberLog from './components/NumberLog'

import { useResolution } from './Hooks/useResolution'

const Routes = () => {
  const [logsData] = useLogs()
  const [agentData] = useAgents()
  const [resData] = useResolution()
  console.log('resData', resData)
  return (
    <Switch>
      <Route exact path="/" component={() => <Home logs={logsData} />} />
      <Route path="/agent" component={() => <Agents agents={agentData} />} />
      <Route path="/logs" component={() => <Logs logs={logsData} />} />
      <Route path="/agentlog/:identifier" component={AgentLog} />
      <Route path="/numberlog/:identifier" component={NumberLog} />
    </Switch>
  )
}

export default Routes
