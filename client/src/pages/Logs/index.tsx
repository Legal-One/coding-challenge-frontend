import React from 'react'

import LogsTable from '../../components/LogsTable'
import { useLogs } from '../../Hooks/useLogs'

const Logs = () => {
  const [logsData] = useLogs()
  return (
    <div>
      {logsData &&
        logsData.map((logs) => <LogsTable key={logs._id} logs={logs} />)}
    </div>
  )
}

export default Logs
