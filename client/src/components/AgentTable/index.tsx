import React from 'react'

import { AgentTableProps } from '../../Types/AgentType'

function AgentTable({ agent }: AgentTableProps) {
  const { identifier, firstName, lastName, email, photo } = agent

  return (
    <div>
      <ul>
        <li>identifier: {identifier}</li>
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

export default AgentTable
