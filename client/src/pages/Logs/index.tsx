import React from 'react'

import LogsTable from '../../components/LogsTable'
const Logs = ({ logs }: any) => {
  return (
    <div>
      {logs &&
        logs.map((logs: any) => <LogsTable key={logs._id} logs={logs} />)}
    </div>
  )
}

export default Logs
