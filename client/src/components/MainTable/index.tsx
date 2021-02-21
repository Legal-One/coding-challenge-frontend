import React from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../Types'
import LogsTableData from '../LogsTableData'
import AgentTableData from '../AgentTableData'
import NumberTableData from '../NumberTableData'
import './MainTable.css'

function MainTable() {
  const currentAgent = useSelector((state: AppState) => state.agents.agents)
  const currentLog = useSelector((state: AppState) => state.logs.logs)
  const logsGrouped = useSelector((state: AppState) => state.logs.logsGrouped)
  const handleGetNumberOfCalls = (logs, number) => {
    const numberOfCalls = logs.filter((log) => log.number === number).length
    return numberOfCalls
  }
  const handleFindAgent = (agentId: string) => {
    const agent = currentAgent.find((agent) => agent.identifier === agentId)
    return agent
  }

  const handleGetCallsByAgentId = (agentIdentifier: string, number: string) => {
    const [numberOfCalls] = logsGrouped[
      agentIdentifier
    ].map((agent, i, array) => handleGetNumberOfCalls(array, number))
    return numberOfCalls
  }
  const uniqueItems = currentLog?.filter((a, position, arr) => {
    return (
      arr.findIndex(
        (b) => b.agentIdentifier === a.agentIdentifier && b.number === a.number
      ) === position
    )
  })

  return (
    <>
      {uniqueItems.map((log) => (
        <tr key={log._id}>
          <td>
            <NumberTableData logs={log} />
          </td>
          <td>
            <LogsTableData
              handleGetCallsByAgentId={handleGetCallsByAgentId}
              log={log}
            />
          </td>
          <td>
            <AgentTableData handleFindAgent={handleFindAgent} log={log} />
          </td>
        </tr>
      ))}
    </>
  )
}

export default MainTable
