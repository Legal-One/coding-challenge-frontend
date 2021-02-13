import React from 'react'

import { AgentTableProps } from '../../Types/AgentType'

function AgentTable({ agent }: AgentTableProps) {
  const { identifier, firstName, lastName, email, photo } = agent

  return (
    <div>
      <ul key={identifier}>
        <li>firstName: {firstName}</li>
        <li>lastName: {lastName}</li>
        <li>email: {email}</li>
        <li>
          <img src={photo} alt="agent" width="120px" />
        </li>
      </ul>
    </div>
  )
}

export default AgentTable
