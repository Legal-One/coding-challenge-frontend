import React from 'react'

import { AgentProps } from '../../Types/AgentType'
import AgentTable from '../AgentTable'

function Agents({ agents }: AgentProps) {
  return (
    <div>{agents && agents.map((agent) => <AgentTable agent={agent} />)}</div>
  )
}

export default Agents
