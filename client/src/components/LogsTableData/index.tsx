import React from 'react'

import { LogsTableDataProps } from '../../Types/ui'

function LogsTableData({ handleGetCallsByAgentId, log }: LogsTableDataProps) {
  return (
    <div>{handleGetCallsByAgentId(log.agentIdentifier, log.number)} calls</div>
  )
}

export default LogsTableData
