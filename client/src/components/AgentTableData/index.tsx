import React from 'react'
import { Link } from 'react-router-dom'

import { AgentTableDataProps } from '../../Types/ui'

function AgentTableData({ handleFindAgent, log }: AgentTableDataProps) {
  const { agentIdentifier } = log

  return (
    <div>
      <Link
        to={`/agentlog/${agentIdentifier}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        {handleFindAgent(agentIdentifier)?.firstName}
        {handleFindAgent(agentIdentifier)?.lastName} /
        {log.dateTime.slice(0, 10)}
      </Link>
    </div>
  )
}

export default AgentTableData
