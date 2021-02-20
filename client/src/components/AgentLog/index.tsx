import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppState } from '../../Types'
import { ParamsProps } from '../../Types/ui'
import './AgentLog.css'
function AgentLog() {
  const { identifier } = useParams<ParamsProps>()

  const logsGrouped = useSelector(
    (state: AppState) => state.logs.logsGrouped[identifier]
  )

  const currentAgent = useSelector((state: AppState) =>
    state.agents.agents.find((agent) => agent?.identifier === identifier)
  )
  const date = new Date(logsGrouped[0].dateTime).toLocaleString('en-GB')
  return (
    <table>
      <tbody>
        <tr>
          <th>Agent Name</th>
          <th>Call date and time</th>
          <th>Resolution</th>
        </tr>
        <tr>
          <td>
            {currentAgent.firstName} {currentAgent.lastName}
          </td>
          <td>{date}</td>
          <td>Resolution</td>
        </tr>
      </tbody>
    </table>
  )
}

export default AgentLog
