import React from 'react'

function AgentTableData({ handleFindAgent, log }: any) {
  return (
    <div>
      {handleFindAgent(log.agentIdentifier)?.firstName} {log.dateTime}
    </div>
  )
}

export default AgentTableData
