import React from 'react'

import { AgentProps } from '../../Types/ui'

function AgentTable({ agent }: AgentProps) {
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
