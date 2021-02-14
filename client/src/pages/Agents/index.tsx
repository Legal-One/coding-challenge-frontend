import React from 'react'


import { useAgents } from '../../Hooks/useAgents'
import AgentTable from '../../components/AgentTable'

function Agents() {
  const [agentData] = useAgents()



  return (
    <div>
      {agentData &&
        agentData.map((agent) => <AgentTable key={agent._id} agent={agent} />)}
    </div>
  )
}

export default Agents
