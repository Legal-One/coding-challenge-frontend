import React from 'react'

import { LogProps } from '../../Types/ui'
function LogsTable({ logs }: LogProps) {
  const { identifier, agentIdentifier, number, dateTime, duration } = logs

  return (
    <div>
      <ul>
        <li>identifier: {identifier}</li>
        <li>agentIdentifier: {agentIdentifier}</li>
        <li>number: {number}</li>
        <li>dateTime: {dateTime}</li>
        <li>duration: {duration}</li>
      </ul>
    </div>
  )
}

export default LogsTable
