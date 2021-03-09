import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../types'
import { useSelector } from 'react-redux'
import TableHeader from '../Table/table-header'
import Table from '../Table'
import AgentTableRow from '../Table/agent-table-row'

const selectAgentCallStats = createSelector(
  (state: RootState) => state.callCenter.calls,
  (state: RootState) => state.callCenter.callIds,
  (state: RootState) => state.callCenter.resolutions,
  (_: any, agentId: string) => agentId,
  (calls, callIds, resolutions, agentId) => {
    const agentCallStats = []
    callIds.forEach((callId: string) => {
      if (agentId === calls[callId].agentIdentifier) {
        agentCallStats.push({ ...calls[callId], resolution: resolutions[callId].resolution })
      }
    })
    return agentCallStats
  }
)

function AgentStats({ agentId }: { agentId: string }) {
  const agentCallStats = useSelector((state: RootState) => selectAgentCallStats(state, agentId))
  const agentData = useSelector((state: RootState) => state.callCenter.agents[agentId])
  const tableHeaders = ['Phone number', 'Call date and time', 'Resolution']
  return (
    <div className="pt-6">
      <div className="agent-profile">
        <img className="profile-photo" src={agentData.photo} />
        <div className="pl-4">
          <div className="has-text-weight-bold is-size-4">
            {agentData.firstName} {agentData.lastName}
          </div>
          <div>{agentData.email}</div>
        </div>
      </div>
      <Table>
        <TableHeader headers={tableHeaders} />
        {agentCallStats.length > 0 &&
          agentCallStats.map((callData, index) => {
            return (
              <AgentTableRow
                key={callData.identifier}
                number={callData.number}
                dateTime={callData.dateTime}
                resolution={callData.resolution}
                isLastRow={index === Object.keys(agentCallStats).length - 1}
              />
            )
          })}
      </Table>
    </div>
  )
}
export default AgentStats
