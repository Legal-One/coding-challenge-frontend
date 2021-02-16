import React from 'react'

import { AgentTableDataProps } from '../../Types/ui'

function AgentTableData({ handleFindAgent, log }: AgentTableDataProps) {
  return (
    <div>
      {handleFindAgent(log.agentIdentifier)?.firstName} {log.dateTime}
    </div>
  )
}

export default AgentTableData
