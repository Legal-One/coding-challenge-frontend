import React from 'react'

import { LogProps } from '../../Types/ui'

import LogsTable from '../../components/LogsTable'
const Logs = ({ logs }: LogProps) => {
  return (
    <div>
      {logs && logs.map((logs) => <LogsTable key={logs._id} logs={logs} />)}
    </div>
  )
}

export default Logs
