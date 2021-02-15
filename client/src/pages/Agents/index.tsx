import React from 'react'

import AgentTable from '../../components/AgentTable'

function Agents({ agents }: any) {
  return (
    <div>
      {agents &&
        agents.map((agent: any) => (
          <AgentTable key={agent._id} agent={agent} />
        ))}
    </div>
  )
}

export default Agents
