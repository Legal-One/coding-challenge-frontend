import React from 'react'
import { useParams } from 'react-router-dom'
import AgentStats from './agent-stats'

function Agent() {
  const { agentId } = useParams<Record<string, string>>()

  return (
    <div>
      <AgentStats agentId={agentId} />
    </div>
  )
}

export default Agent
