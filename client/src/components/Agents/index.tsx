import React from 'react'

import { AgentProps } from '../../Types/AgentType'
import AgentTable from '../AgentTable'

function Agents({ agents }: AgentProps) {
  return (
    <div>
      {agents &&
        agents.map((agent) => <AgentTable key={agent._id} agent={agent} />)}
    </div>
  )
}

export default Agents
