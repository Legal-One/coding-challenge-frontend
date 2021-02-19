import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppState } from '../../Types'
import './AgentLog.css'
function AgentLog() {
  const { paramsId } = useParams<any>()

  const logsGrouped = useSelector((state: AppState) => state.logs.logsGrouped)

  const currentAgent = useSelector((state: AppState) =>
    state.agents.agents.find((agent) => agent.id === logsGrouped[paramsId])
  )

  const { firstName, email, lastName, photo } = currentAgent
  return (
    <div>
      <ul className="agent">
        <li>firstName: {firstName}</li>
        <li>lastName: {lastName}</li>
        <li>email: {email}</li>

        <li>
          <img src={photo} alt="agent" width="100px" />
        </li>
      </ul>
    </div>
  )
}

export default AgentLog
