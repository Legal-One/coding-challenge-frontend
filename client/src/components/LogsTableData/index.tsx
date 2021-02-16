import React from 'react'

function LogsTableData({ handleGetCallsByAgentId, log }: any) {
  return <div>{handleGetCallsByAgentId(log.agentIdentifier, log.number)}</div>
}

export default LogsTableData
