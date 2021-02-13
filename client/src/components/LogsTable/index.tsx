import React from 'react'

import { LogsProps } from '../../Types/LogsType'

function LogsTable({ logs }: LogsProps) {
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
