import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../types'
import { useSelector } from 'react-redux'
import TableHeader from '../Table/table-header'
import Table from '../Table'
import CallTableRow from '../Table/call-table-row'
import { selectAgents } from '../../features/callcenter/callcenter-slice'

const selectCallNumberStats = createSelector(
  (state: RootState) => state.callCenter.calls,
  (state: RootState) => state.callCenter.callIds,
  (state: RootState) => state.callCenter.resolutions,
  (_: any, number: string) => number,
  (calls, callIds, resolutions, number) => {
    const callNumberStats = []
    callIds.forEach((callId: string) => {
      if (
        number ===
        (calls[callId].number.charAt(0) === '+'
          ? calls[callId].number.slice(1, calls[callId].number.length)
          : calls[callId].number)
      ) {
        callNumberStats.push({ ...calls[callId], resolution: resolutions[callId].resolution })
      }
    })
    return callNumberStats
  }
)

function CallNumberStats({ number }: { number: string }) {
  const agentCallStats = useSelector((state: RootState) => selectCallNumberStats(state, number))
  const tableHeaders = ['Agent name', 'Call date and time', 'Resolution']
  const agents = useSelector(selectAgents)
  return (
    <div className="pt-6">
      <Table>
        <TableHeader headers={tableHeaders} />
        {agentCallStats.length > 0 &&
          agentCallStats.map((callData, index) => {
            return (
              <CallTableRow
                key={callData.identifier}
                agentName={`${agents[callData.agentIdentifier].firstName}  ${
                  agents[callData.agentIdentifier].lastName
                }`}
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
export default CallNumberStats
