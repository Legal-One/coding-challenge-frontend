import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Agents from './pages/Agents'
import Logs from './pages/Logs'
import { useLogs } from './Hooks/useLogs'
import { useAgents } from './Hooks/useAgents'
import AgentLog from './components/AgentLog'

const Routes = () => {
  const [logsData] = useLogs()
  const [agentData] = useAgents()

  return (
    <Switch>
      <Route exact path="/" component={() => <Home logs={logsData} />} />
      <Route path="/agent" component={() => <Agents agents={agentData} />} />
      <Route path="/logs" component={() => <Logs logs={logsData} />} />
      <Route path="/agentlog/:identifier" component={AgentLog} />
    </Switch>
  )
}

export default Routes
